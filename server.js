const Hapi = require('hapi');
const Promise = require('bluebird');
const sqlite3 = require('sqlite3');
const config = require('./config');
const setHeader = require('hapi-set-header');

var db = Promise.promisifyAll(new sqlite3.Database(config.dbUrl));

const server = new Hapi.Server();
server.connection({ 
  port: 8080, 
  host: 'localhost', 
  routes: { 
    cors: {
      additionalExposedHeaders: ['Content-Range']
    } 
  } 
});
const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [
          {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', request: '*', response: '*', error: '*' }]
          }, 
          {module: 'good-console'},
          'stdout'
        ]
    }
};

server.register(
  [
    {
        register: require('hapi-error-logger'),
        options: {
          replyWithStack: true
        }
    },
    {
      register: require('good'),
      options
    }
    // require('hapi-es7-async-handler'),
    // require('hapi-pagination')
  ], 
  (err) => {
      if (err)
        throw err;
  }
);

server.on('request-error', function (request, err) {
  console.log(err.data);
  console.log('Error response (500) sent for request: ' + request.id + ' because: ' + (err.trace || err.stack || err));
});
setHeader(server, 'Content-Range', 'users 0-24/319');


server.route({
  method: 'GET',
  path: '/',
  handler: async (request, reply) => {
    reply('Hello, world!');
  }
});

server.route({
  method: 'GET',
  path: '/locks',
  handler: async (request, reply) => {
    const query = `SELECT * FROM locks 
                  ${request.query.owner_id ? `Where owner_id = ?`: ``}
                  LEFT OUTER JOIN users ON locks.owner_id = users.h_id;`;
    console.log(query);
    const keys = await db.allAsync(query, [request.query.owner_id]);
    return reply(keys);
  }
});

server.route({
  method: 'POST',
  path: '/locks',
  handler: async (request, reply) => {
    await db.runAsync(
      `INSERT INTO locks (description, owner_id) VALUES (?, ?);`,
       [request.payload.description, request.payload.owner_id]
    );
    const id = db.getAsync(`SELECT last_insert_rowid();`);
    reply(id);
  }
});

server.route({
  method: 'GET',
  path: '/locks/:lock_id',
  handler: async (request, reply) => {
    return db.getAsync(
      `SELECT * FROM locks WHERE id = ?` ,
      [request.params.lock_id])
      .then(reply);
  }
});

server.route({
  method: 'PUT',
  path: '/locks/:lock_id',
  handler: async (request, reply) => {
    return db
    .runAsync(
      `UPDATE locks
       SET description=? owner_id=?
       WHERE id = ?`,
       [request.payload.description, request.payload.owner_id, request.params.lock_id]
    ).then(reply);
  }
});

server.route({
  method: 'GET',
  path: '/activity',
  handler: async (request, reply) => {
    const query = `SELECT (user_id, succesful, timestamp) FROM activity `
                  + (request.query.lock_id ? `Where lock_id = ?;`: `;`);
    return db.allAsync(query, [request.query.lock_id]).then(reply);
  }
});

server.route({
  method: 'GET',
  path: '/users',
  handler: async (request, reply) => {
    let filter = JSON.parse(request.query.filter)
    if (filter.id){
      console.log("getting one user", filter.id[0]);
      const r = await db.getAsync(`SELECT * FROM USERS WHERE h_id = ?;`, [filter.id[0]]);
      console.log("got", r);
      reply([r]);
    }
    else{
      console.log('getting all', request.query);
      return db
      .allAsync(`SELECT * FROM USERS;`).then(reply);
    }
    
  }
});

// server.route({
//   method: 'GET',
//   path: '/users',
//   handler: async (request, reply) => {
//         .then(reply);
//   }
// });

server.route({
  method: 'POST',
  path: '/users',
  handler: async (request, reply) => {
      const res = await db.runAsync(
        `INSERT INTO users
         VALUES (?, ?, ?);`,
         [request.payload.h_id, request.payload.name, request.payload.phone]
      );
      reply({id: request.payload.h_id});
    
  }
});

server.route({
  method: 'PUT',
  path: '/users/:hid',
  handler: async (request, reply) => {
    return db
    .runAsync(
      `UPDATE users
       SET name=? phone=?
       WHERE id = ?`,
       [request.params.hid, request.payload.name, request.payload.phone]
    ).then(reply);
  }
});

server.route({
  method: 'POST',
  path: '/locks/:lock_id/unlock',
  handler: async (request, reply) => {
    const lock_id = request.params.lock_id;
    const user_id = request.payload.user_id;

    const permissions = await db.getAsync(`
      SELECT * FROM permissions 
      WHERE lock_id = ? AND user_id = ?`,
      [lock_id, user_id]
    );
    const permitted = permissions !== undefined;
    await db.runAsync(
      `INSERT INTO activity (lock_id, user_id, succesful)
      VALUES (?, ?, ?)`,
      [lock_id, user_id, permitted? 0 : 1]
    );

    return reply(permitted? 200 : 403);
  }
});

function inParam (sql, arr) {
  return sqlite3.replace('?#', arr.map(()=> '?' ).join(','))
}

server.route({
  method: 'GET',
  path: '/permissions',
  handler: async (request, reply) => {
    const query = `SELECT (user_id, lock_id) FROM permissions` 
                  + (request.query.lock_id ? `Where lock_id IN (?#)`: ``);

    const keys = await db.allAsync(inParam(query, [request.query.filter.id]));
    return reply(keys);
  }
});

server.route({
  method: 'POST',
  path: '/permissions',
  handler: async (request, reply) => {
    return db
    .runAsync(
      `INSERT INTO permissions (lock_id, user_id)
       VALUES (?, ?)`,
       [request.payload.lock_id, request.payload.user_id]
    ).then(reply);
  }
});

server.route({
  method: 'DELETE',
  path: '/permissions/:id',
  handler: async (request, reply) => {
    return db
    .runAsync(
      `DELETE FROM permissions WHERE id=?`,
       [request.params.id]
    ).then(reply);
  }
});

server.route({
  method: 'GET',
  path: '/config',
  handler: async (request, reply) => {
    reply('Hello, world!');
  }
});


server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
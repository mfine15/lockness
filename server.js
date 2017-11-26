const Hapi = require('hapi');
const Promise = require('bluebird');
const config = require('./config');
const Airtable = require('airtable');
const base = new Airtable({apiKey: config.apiKey}).base(config.apiUrl);


const server = new Hapi.Server();
server.connection({ 
  port: 8080, 
  host: 'localhost', 
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
      register: require('good')
    }
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

server.method({
  name: 'checkId', 

  method: (huid, next) => {
    base('Guests').select({
      filterByFormula: `{huid} = "${huid}"`,
      maxRecords: 1
    }).firstPage((err, records) => {
      if (err) { console.error(err); next(null, "records") }
      next(null, records)
    });
  },
  options: {
    cache: {
      expiresIn: 1000*60*60*24*7,
      staleIn: 1000*60*60,
      staleTimeout: 100,
      generateTimeout: 1000*5
    }
  }
})


server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('Hello, world!');
  }
});

server.route({
  method: 'GET',
  path: '/unlock',
  handler: (request, reply) => {
    server.methods.checkId(request.query.huid, (err,res) => {
      if (err) { console.error(err); reply(404) }
      reply(res);
    });
  }

})


server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
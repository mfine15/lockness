CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name varchar(200),
  phone varchar(32)
);

CREATE TABLE locks(
  id SERIAL PRIMARY KEY,
  description text,
  owner_id int NOT NULL,
  FOREIGN KEY(owner_id) REFERENCES users(id)
);

CREATE TABLE permissions(
  id SERIAL PRIMARY KEY,
  lock_id int NOT NULL,
  user_id int NOT NULL,
  FOREIGN KEY(lock_id) REFERENCES locks(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE activity(
  lock_id int NOT NULL,
  user_id int NOT NULL,
  succesful INTEGER,
  timestamp timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(lock_id) REFERENCES locks(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE DATABASE todoApp;


-------------
//Запускать в базе данных todoApp 

CREATE TABLE todos (
  todo_id serial PRIMARY KEY,
  user_id integer,
  title VARCHAR(30),
  completed BOOLEAN
);

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  hashed_password VARCHAR(255),
  isActivated BOOLEAN DEFAULT false,
  activationLink VARCHAR(255) 
);

CREATE TABLE refreshToken (
  token_id serial PRIMARY KEY,
  refreshToken VARCHAR(255),
  user_id integer
)
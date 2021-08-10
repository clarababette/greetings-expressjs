create table users(
	id serial not null primary key,
	username text not null unique,
  english int,
  hungarian int,
  swahili int
);
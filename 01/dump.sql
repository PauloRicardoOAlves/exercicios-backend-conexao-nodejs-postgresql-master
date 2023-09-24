create database biblioteca;

create table autores (
  id serial primary key,
  nome text not null,
  idade integer
  );
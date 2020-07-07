create database jwttutorial;

create table users(
    user_id uuid Primary key DEFAULt uuid_generate_v4(),
    user_name Varchar(255) not null, 
    user_email varchar(255) not null,
    user_password varchar(255) not null
);


insert into users (user_name, user_email, user_password) values('henry', 'hernryly213@gmail.com', 'password');

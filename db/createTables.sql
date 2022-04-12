DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password VARCHAR(30),
    email VARCHAR(30),
    name VARCHAR(30)
);


DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    habit_id SERIAL PRIMARY KEY,
    user_id INT,
    name VARCHAR(20),
    description VARCHAR(100), 
    frequency INT,
    daily_monthly VARCHAR(20), 
    color VARCHAR (20),
    creation_date DATE DEFAULT CURRENT_DATE
);

DROP TABLE IF EXISTS completed_habits;

CREATE TABLE completed_habits (
    id SERIAL PRIMARY KEY,
    habit_id INT,
    user_id INT,
    dateCompleted DATE DEFAULT CURRENT_DATE, 
    count INT
);



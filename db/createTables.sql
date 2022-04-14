DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password VARCHAR(500),
    email VARCHAR(50)
);


DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    habit_id SERIAL PRIMARY KEY,
    user_id INT,
    name VARCHAR(20),
    description VARCHAR(100), 
    frequency INT,
    day_month VARCHAR(20), 
    color VARCHAR (20),
    creation_date DATE DEFAULT CURRENT_DATE
);

DROP TABLE IF EXISTS completed_habits;

CREATE TABLE completed_habits (
    habit_id INT,
    date_completed DATE DEFAULT CURRENT_DATE
);



INSERT INTO users (username, password, email) 
VALUES
 ('AlexPat', 'iloveducks', 'alpat@gmail.com'),
('Beth', 'bethlovesducks', 'beth@gmail.com');


INSERT INTO habits (user_id, name, description, frequency, day_month, color, creation_date) 
VALUES 
(1, 'Exercise', 'Have you exercised today?', 2, 'day', 'red', '2022-04-08'),
(2, 'Run', 'Have you run today?', 3, 'week', 'yellow', '2022-04-08');

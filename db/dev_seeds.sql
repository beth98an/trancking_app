INSERT INTO users (username, password, email) 
VALUES
 ('AlexPat', 'iloveducks', 'alpat@gmail.com'),
('Beth', 'bethlovesducks', 'beth@gmail.com');


INSERT INTO habits (user_id, name, description, frequency, day_month, color, creation_date) 
VALUES 
(1, 'Exercise', 'Have you exercised today?', 2, 'day', 'red', '2022-04-08'),
(2, 'Run', 'Have you run today?', 3, 'week', 'yellow', '2022-04-08'),
(2, 'Walk', 'Have you walk today?', 3, 'week', 'yellow', '2022-04-08'),
(2, 'Cycle', 'Have you cycle today?', 3, 'week', 'yellow', '2022-04-08'),
(2, 'sleep', 'Have you sleep today?', 3, 'week', 'yellow', '2022-04-08');

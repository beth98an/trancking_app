INSERT INTO users (username, password, email, name) 
VALUES
 ('AlexPat', 'iloveducks', 'alpat@gmail.com', 'Alex Patient'),
('Beth', 'bethlovesducks', 'beth@gmail.com', 'Beth Evans');


INSERT INTO habits (user_id, name, question, frequency, color, creation_date) 
VALUES 
(1, 'Exercise', 'Have you exercised today?', 'Once per day', 'red', '2022-04-08'),
(2, 'Run', 'Have you ran today?', 'Once per day', 'yellow', '2022-04-11');

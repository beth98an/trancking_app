INSERT INTO users (username, password, email) 
VALUES
 ('AlexPat', '$2b$10$LNIU.0Je7dUCH3iwjlr5LOA7iB1AiepHwFLvyI/hj99Mb10/7lKKS', 'alpat@gmail.com'), 
('Beth', '$2b$10$ueXYYfVF.ml1IcOY2mvSG.8.QERa0MrIziuIBolyjojktv7ngJ.vu', 'beth@gmail.com');


INSERT INTO habits (user_id, name, description, frequency, day_month, color, creation_date) 
VALUES 
(1, 'Exercise', 'Have you exercised today?', 2, 'day', 'red', '2022-04-08'),
(1, 'Run', 'Have you run today?', 3, 'week', 'yellow', '2022-04-08'),
(2, 'Run', 'Have you run today?', 3, 'week', 'yellow', '2022-04-08'),
(2, 'Walk', 'Have you walk today?', 3, 'week', 'yellow', '2022-04-08'),
(2, 'Cycle', 'Have you cycle today?', 3, 'week', 'yellow', '2022-04-08'),
(2, 'sleep', 'Have you sleep today?', 3, 'week', 'yellow', '2022-04-08');


INSERT INTO completed_habits (habit_id, date_completed)
VALUES
(1, '2022-04-13'),
(1, '2022-04-13'),
(1, '2022-04-13'),
(2, '2022-04-14'),
(2, '2022-04-14'),
(2, '2022-05-08'),
(2, '2022-05-08');

TRUNCATE users, habits RESTART IDENTITY;

INSERT INTO users (username, password, email) VALUES
('user1', '$2b$10$B5sq3tcuIVG8jGHbI9ZvyehtPi6F8diG0qrskyOMOUs.nVZwkkQdi', 'user1@email.com'),
('user2', '$2b$10$bzAsxLViUCx/o3kTF1TNK.J70FoH7HoEwrgtEPqZ3BrjbxXzoiDui', 'user2@email.co.uk');

INSERT INTO habits (user_id, name, description, frequency, day_month, color) 
VALUES 
(1, 'habit1', 'have you done habit1', 3, 'day', 'yellow'),
(2, 'habit2', 'have you done habit2', 5, 'day', 'green'),
(1, 'habit3', 'have you done habit3', 2, 'day', 'blue'),
(2, 'habit4', 'have you done habit4', 1, 'month', 'orange');

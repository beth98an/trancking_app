TRUNCATE users, habits RESTART IDENTITY;

INSERT INTO users (username, password, email, name) VALUES
('user1', 'password1', 'user1@email.com', 'userone'),
('user2', 'password2', 'user2@email.co.uk', 'usertwo');

INSERT INTO habits (user_id, name, question, frequency, color) VALUES 
(1, 'habit1', 'have you done habit1', 'three times a day', 'yellow'),
(2, 'habit2', 'have you done habit2', 'five times a day', 'green'),
(1, 'habit3', 'have you done habit3', 'twice a day', 'blue'),
(2, 'habit4', 'have you done habit4', 'once a day', 'orange');

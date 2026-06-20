
INSERT INTO users (username, password, role, enabled)
SELECT 'admin', '$2a$12$5zRL9T2VQ1DkDfidkF4VKOEx6MEpq2rWBOV2dlEO2a/3C9uuYjT1S', 'ADMIN', 1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');


INSERT INTO users (username, password, role, enabled)
SELECT 'itstaff', '$2a$12$jOlEbUkp2jkp.kDImCb0c.ZwznkTn7dRbWTdT/TcymCfCoKn.jkM.', 'IT_STAFF', 1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'itstaff');


INSERT INTO users (username, password, role, enabled)
SELECT 'employee1', '$2a$12$5vqClLwJMqIjCWnAFZ6eee0cDOGR9Bi5tDMCtfaeYUWlV7N40ncQi', 'EMPLOYEE', 1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'employee1');
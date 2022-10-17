CREATE USER hammerspace IDENTIFIED BY 'hammerspace';
CREATE DATABASE hammerspace;
GRANT ALL PRIVILEGES ON DATABASE hammerspace TO hammerspace;


CREATE TABLE IF NOT EXISTS user (
    id INTEGER AUTO INCREMENT,
    username VARCHAR(200),
    password VARCHAR(64),
    fullname VARCHAR(200),
    creationTime DATETIME,
    isActive BOOLEAN,
    isDeleted BOOLEAN
);

DECLARE users INTEGER = 0;
BEGIN
    SELECT @users = COUNT(*) FROM user;

    IF (users <= 0)
    THEN
        INSERT INTO user 
        VALUES ('potato', 'f4610aa514477222afac2b77f971d069780ca2846f375849f3dfa3c0047ebbd1', 'Potato Potato', NOW(), 1, 0) -- password batata
        VALUES ('tomato', 'cea70552116071b4ea769c41150f7f76c0e7673bfd6dc62453d507e41af9b529', 'Tomato Tomate', NOW(), 1, 0) -- password tomate
        VALUES ('bruh', '408f31d86c6bf4a8aff4ea682ad002278f8cb39dc5f37b53d343e63a61f3cc4f', 'Bruh d Bro', NOW(), 1, 0) -- password bruh
    END IF
END


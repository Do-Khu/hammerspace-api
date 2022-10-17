CREATE USER hammerspace WITH PASSWORD 'hammerspace';
CREATE DATABASE hammerspace;
--CREATE ROLE hammerspace LOGIN PASSWORD 'hammerspace';
GRANT ALL PRIVILEGES ON DATABASE hammerspace TO hammerspace;
\c hammerspace

CREATE TABLE IF NOT EXISTS user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(200),
    password VARCHAR(64),
    fullname VARCHAR(200),
    isActive BOOLEAN,
    isDeleted BOOLEAN
);

INSERT INTO user VALUES 
('potato', 'f4610aa514477222afac2b77f971d069780ca2846f375849f3dfa3c0047ebbd1', 'Potato Potato', true, false);
('tomato', 'cea70552116071b4ea769c41150f7f76c0e7673bfd6dc62453d507e41af9b529', 'Tomato Tomate', true, false);
('bruh', '408f31d86c6bf4a8aff4ea682ad002278f8cb39dc5f37b53d343e63a61f3cc4f', 'Bruh d Bro', true, false);


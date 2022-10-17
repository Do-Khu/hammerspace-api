CREATE USER hammerspace WITH PASSWORD 'hammerspace';
CREATE DATABASE hammerspace;
GRANT ALL PRIVILEGES ON DATABASE hammerspace TO hammerspace;


\c hammerspace

CREATE TABLE IF NOT EXISTS "userClients" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(200),
    password VARCHAR(64),
    fullName VARCHAR(200),
    creationTime timestamp,
    isActive BOOLEAN,
    isDeleted BOOLEAN
);
ALTER TABLE "userClients" OWNER TO hammerspace;

INSERT INTO "userClients"(username,password,fullName,creationTime,isActive,isDeleted) VALUES ('potato', 'f4610aa514477222afac2b77f971d069780ca2846f375849f3dfa3c0047ebbd1', 'Potato Potato', NOW(), true, false);-- password batata
INSERT INTO "userClients"(username,password,fullName,creationTime,isActive,isDeleted) VALUES ('tomato', 'cea70552116071b4ea769c41150f7f76c0e7673bfd6dc62453d507e41af9b529', 'Tomato Tomate', NOW(), true, false); -- password tomate
INSERT INTO "userClients"(username,password,fullName,creationTime,isActive,isDeleted) VALUES ('bruh', '408f31d86c6bf4a8aff4ea682ad002278f8cb39dc5f37b53d343e63a61f3cc4f', 'Bruh d Bro', NOW(), true, false); -- password bruh

SELECT * FROM "userClients";
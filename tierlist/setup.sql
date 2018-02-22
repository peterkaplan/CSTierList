\set user :u
\set password :p

DROP DATABASE IF EXISTS tier_db;

/*DROP ROLE IF EXISTS :user; not sure if we want to do this, because it causes an error due to privileges */
CREATE ROLE :user WITH LOGIN PASSWORD :'password';
ALTER ROLE :user CREATEDB;
CREATE DATABASE tier_db;
GRANT ALL PRIVILEGES ON DATABASE tier_db TO :user;
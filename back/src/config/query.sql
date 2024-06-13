CREATE DATABASE soyhenry_db

rodemayo_henry

rodemayo_henryuser
rodemayo_henryP4ss


CREATE USER rodemayo_henryuser WITH PASSWORD 'rodemayo_henryP4ss';

CREATE DATABASE rodemayo_henry;

REVOKE ALL PRIVILEGES ON DATABASE my_database FROM my_user;

DROP USER my_user;


CREATE USER rodemayo_henryuser WITH
    PASSWORD 'rodemayo_henryP4ss'
    SUPERUSER
    CREATEDB
    CREATEROLE
    REPLICATION
    BYPASSRLS;

ALTER USER rodemayo_henryuser SUPERUSER;

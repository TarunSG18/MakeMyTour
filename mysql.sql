CREATE DATABASE mydatabase;
USE mydatabase;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uname VARCHAR(50) NOT NULL,
    uemail VARCHAR(50) NOT NULL,
    pword VARCHAR(50) NOT NULL
);

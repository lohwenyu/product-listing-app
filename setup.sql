CREATE TABLE IF NOT EXIST `users` (
	uid VARCHAR(36) NOT NULL,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (uid)
);

CREATE TABLE IF NOT EXIST `listings` (
	uid VARCHAR(36) NOT NULL,
	category VARCHAR(45) NOT NULL,
	price DOUBLE NOT NULL,
	name VARCHAR(60) NOT NULL,
	description LONGTEXT,
	image VARCHAR(60) NOT NULL,
	user_uid VARCHAR(36) NOT NULL,
	
	PRIMARY KEY (uid),
	FOREIGN KEY (user_uid)
		REFERENCES users (uid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FULLTEXT KEY (name, description, category)
);
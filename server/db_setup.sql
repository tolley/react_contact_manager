create table users (
	id int(11) unsigned not null auto_increment primary key,
	username varchar(255) unique default '' comment 'Need to allow nulls cause tokens can be created before the user has had a change to fill out their profile in the case of 3rd party logins',
	password varchar(255) default '' comment 'Third party logins wont have passwords so we need to allow nulls',
	create_date timestamp,
	last_update timestamp
);

# A trigger to enter the create date and last update for a user when one is inserted
create trigger user_insert
	before insert on users
	for each row set new.create_date = now(),
					new.last_update = now();

# Holds individual contact details
create table contacts (
	id int(11) unsigned not null auto_increment primary key,
	user_id int(11) unsigned not null comment 'The id of the user that owns this contact',
	first_name varchar(255),
	last_name varchar(255),
	email_address varchar(255),
	phone varchar(10),
	street_address varchar(255),
	street_address2 varchar(255),
	city varchar(255),
	state varchar(2),
	zip varchar(5),
	create_date timestamp,
	last_update timestamp
);

# A trigger to enter the create date and last update for a contact when one is inserted
create trigger contacts_insert
	before insert on contacts
	for each row set new.create_date = now(),
					new.last_update = now();
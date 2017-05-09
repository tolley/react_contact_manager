create table users (
	id int(11) unsigned not null auto_increment primary key,
	username varchar(255) unique default '' comment 'Need to allow nulls cause tokens can be created before the user has had a change to fill out their profile in the case of 3rd party logins',
	password varchar(255) default '' comment 'third party logins wont have passwords so we need to allow nulls',
	create_date timestamp,
	last_update timestamp
);

# A trigger to enter the create date and last update for a user when one is inserted
create trigger user_insert
	before insert on users
	for each row set new.create_date = now(),
					new.last_update = now();

# Insert some dummy data into users
insert into users 
( username, password ) 
values 
( 'tolley', 'password' );

# Holds individual contact details
create table contact (
	id int(11) unsigned not null auto_increment primary key,
	uid int(11) unsigned not null,
	name varchar(255) not null,
	create_date timestamp,
	last_update timestamp
);

# A trigger to enter the create date and last update for a contact when one is inserted
create trigger contact_insert
	before insert on contact
	for each row set new.create_date = now(),
					new.last_update = now();
CREATE TABLE UserRole (
id bigint primary key auto_increment,
role varchar(255) unique not null,
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null
);

insert into UserRole (role) VALUES ('Customer'), ('Admin'), 
('Internal Team for Quotes'), ('Supervisor'), ('Procurement');

select * from UserRole;

create table User (
id bigint primary key auto_increment,
name varchar(255) not null,
email varchar(255) unique not null,
phoneNumber varchar(20) unique not null,
otp varchar(5),
role bigint not null,
profilePhoto varchar(255),
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null,
foreign key (role) references UserRole(id)
);

select * from User;

create table ProductType (
id int primary key auto_increment,
type varchar(255) unique not null,
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null
);

insert into ProductType(type) VALUES ('bathroom'), ('kitchen'), ('garden');

SELECT * FROM ProductType;

create table UserProperty (
id bigint primary key auto_increment,
userId bigint not null,
type int not null,
length float not null,
breadth float not null,
budget varchar(255) not null,
issues text not null,
objective text not null,
style varchar(255) not null,
timeline varchar(255) not null,
specialRequest text not null,
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null,
foreign key (type) references ProductType(id)
);

create table PropertyAssets (
id bigint primary key auto_increment,
propertyId bigint not null,
type enum('image', 'video') not null,
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null
);
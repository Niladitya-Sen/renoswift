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

alter table User add column password varchar(200);
alter table User add column imageURL varchar(200);
alter table User drop column otp; 

select u.email, ur.role from User as u INNER JOIN UserRole as ur where u.email = 'niladityasen.2212@gmail.com' and u.role = ur.id;

INSERT INTO User (name, email, phoneNumber, role, password) VALUES ('Admin', 'admin@renoswift.com', '1234567890', 2, '1234');

DELETE from User WHERE email = 'admin@renoswift.com';

select u.email, ur.role from User as u INNER JOIN UserRole as ur where u.email = 'admin@renoswift.com' and u.role = ur.id;



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

alter table UserProperty add column brands text not null;
alter table UserProperty modify column specialRequest text;

desc UserProperty;

select * from UserProperty;

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

create table UserPropertyAssets (
id bigint primary key auto_increment,
userId bigint not null,
propertyId bigint not null,
propertyType int not null,
type enum('image', 'video') not null,
url varchar(200) not null,
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null,
foreign key(userId) references User(id),
foreign key(propertyType) references ProductType(id),
foreign key(propertyId) references UserProperty(id)
);

drop table UserPropertyAssets;

select * FROM UserPropertyAssets;

create table OTP (
id bigint primary key auto_increment,
email varchar(255),
phoneNumber varchar(255),
otp int not null,
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null,
check (otp >= 1000 and otp <= 9999)
);

select * from OTP;

create table Quote (
id bigint primary key auto_increment,
quoteId varchar(100) unique not null default UUID(),
userId bigint not null,
propertyId bigint not null,
name varchar(200) not null,
contactNumber varchar(200) not null,
email varchar(200) not null,
country varchar(200) not null,
state varchar(200) not null,
address varchar(200) not null,
specialRequest varchar(200),
remodelingDate date not null,
zipcode varchar(20) not null,
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null,
foreign key(userId) references User(id),
foreign key(propertyId) references UserProperty(id)
);

select * from Quote;

select quoteId, createdDate from Quote where userId = 3 ORDER BY createdBy DESC LIMIT 10 OFFSET 10;
drop table Quote;

TRUNCATE table Quote;

SELECT count(id) from Quote;

SELECT q.quoteId, q.createdDate, q.propertyId, up.length, up.breadth, up.budget, up.issues, up.objective, up.style, up.timeline, up.specialRequest, q.address
FROM Quote as q INNER JOIN UserProperty as up WHERE q.quoteId = '63f15cbd-e1ed-11ee-a72a-00155deddf31' AND q.propertyId = up.id;

SELECT id, type, url FROM UserPropertyAssets WHERE propertyId = 14;

SELECT * FROM UserPropertyAssets;

CREATE TABLE OperationsTeam (
id bigint primary key auto_increment,
name varchar(255) not null,
email varchar(255) unique not null,
phoneNumber varchar(20) unique not null,
role bigint not null default 3,
otRole varchar(200) not null,
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

alter table OperationsTeam add column address varchar(200) not null;


SELECT * FROM OperationsTeam;
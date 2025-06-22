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

INSERT INTO UserRole (role) VALUES ('Developer');

CREATE TABLE Admin (
id bigint primary key auto_increment,
name varchar(255) not null,
email varchar(255) unique not null,
phoneNumber varchar(20) unique not null,
password varchar(5),
role bigint not null default 2,
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

INSERT INTO Admin (name, email, phoneNumber, password) VALUES ('Admin', 'admin@renoswift.com', '1234567890', '1234');



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

ALTER TABLE UserProperty ADD COLUMN windows int not null;
ALTER TABLE UserProperty ADD COLUMN doors int not null;
ALTER TABLE UserProperty ADD COLUMN height float not null;
ALTER TABLE UserProperty ADD COLUMN area float not null;

ALTER TABLE UserProperty MODIFY COLUMN specialRequest text;


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



create table Quote (
id bigint primary key auto_increment,
quoteId varchar(200) unique not null,
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
status enum('raised', 'pending', 'sent') not null default 'pending',
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



DELIMITER //
CREATE TRIGGER generate_quoteId BEFORE INSERT ON Quote
FOR EACH ROW
BEGIN
    DECLARE padded_id VARCHAR(200);
    SET padded_id = LPAD((SELECT COUNT(id) as id FROM Quote), 4, '0'); -- Ensure at least 4 digits, padding with zeros if necessary
    SET NEW.quoteId = CONCAT('RS', padded_id);
END;
//
DELIMITER ;

DROP Trigger generate_quoteId;


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


CREATE TABLE QuoteStatus (
id bigint primary key auto_increment,
quoteId varchar(200) not null,
status enum('raised', 'pending', 'sent') not null default 'pending',
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null,
foreign key(quoteId) references Quote(quoteId)
);


CREATE TABLE QuoteReply (
id bigint primary key auto_increment,
quoteId varchar(200) not null,
designPlan varchar(200) not null,
quotation varchar(200) not null,
timeline varchar(200) not null,
teamRemarks varchar(200),
customerRemarks varchar(200),
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null,
foreign key(quoteId) references Quote(quoteId)
);

ALTER TABLE QuoteReply MODIFY COLUMN amount double;



CREATE TABLE Payment (
id bigint primary key auto_increment,
userId bigint not null,
paymentId varchar(200) unique not null,
quoteId varchar(200),
status enum('initiated', 'pending', 'done') not null default 'initiated',
phase varchar(200) not null,
amountPaid double not null default 0,
amountDue double not null,
method varchar(200) not null,
finalDueDate datetime,
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null,
foreign key(quoteId) references Quote(quoteId),
foreign key(userId) references User(id)
);

ALTER TABLE Payment ADD COLUMN receipt varchar(200) not null;


DELIMITER //
CREATE TRIGGER generate_paymentId BEFORE INSERT ON Payment
FOR EACH ROW
BEGIN
    DECLARE padded_id VARCHAR(200);
    SET padded_id = LPAD((SELECT COUNT(id) as id FROM Payment), 4, '0'); -- Ensure at least 4 digits, padding with zeros if necessary
    SET NEW.paymentId = CONCAT('RSP', padded_id);
END;
//
DELIMITER ;

CREATE TABLE Order_ (
id bigint primary key auto_increment,
orderId varchar(200) unique,
userId bigint not null,
quoteId varchar(200),
status enum('confirmed', 'pending') not null default 'pending',
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null,
foreign key(quoteId) references Quote(quoteId),
foreign key(userId) references User(id)
);


CREATE TABLE OrderStatus (
id bigint primary key auto_increment,
orderId varchar(200) not null,
status varchar(200) not null,
remarks text,
date date not null,
imageURL varchar(200),
isCompleted boolean default false,
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null,
foreign key(orderId) references Order_(orderId)
);


CREATE TABLE ProductSuppliers (
id bigint primary key auto_increment,
supplierId varchar(200) not null unique,
name varchar(255) not null,
email varchar(255) unique not null,
phoneNumber varchar(20) unique not null,
address varchar(255) not null,
spoc varchar(255) not null,
yearsInOperation int not null,
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null
);


CREATE TRIGGER generate_supplierId BEFORE INSERT ON ProductSuppliers
FOR EACH ROW
BEGIN
    DECLARE padded_id VARCHAR(200);
    SET padded_id = LPAD((SELECT COUNT(id) as id FROM ProductSuppliers), 4, '0'); -- Ensure at least 4 digits, padding with zeros if necessary
    SET NEW.supplierId = CONCAT('SP', padded_id);
END;


CREATE TABLE Brand (
id int primary key auto_increment,
name varchar(200) not null unique,
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null
);

INSERT INTO Brand(name) VALUES ('Oyster LifeStyle'), ('Jaquar'), ('Cera'), ('Hindware'), ('Parryware'), ('Johnson Bathrooms'),
('Kohler'), ('Grohe'), ('Toto'), ('Duravit'), ('Roca');


CREATE TABLE ProductSupplierBrands (
    id bigint primary key auto_increment,
    supplierId varchar(200) not null,
    brandId int not null,
    isValid boolean default true,
    isActive boolean default true,
    isDeleted boolean default false,
    createdBy varchar(255),
    modifiedBy varchar(255),
    createdDate datetime default NOW() not null,
    modifiedDate datetime default NOW() not null,
    DBTimeStamp datetime default NOW() not null,
    foreign key(brandId) references Brand(id),
    foreign key(supplierId) references ProductSuppliers(supplierId)
    -- TODO: add foreign key for supplierId which was giving error
);


CREATE TABLE Products (
  id bigint primary key auto_increment,
  productId varchar(200) unique not null,
  supplierId varchar(200) not null,
  name varchar(200) not null,
  category int not null,
  brandId int not null,
  price double not null,
  details text not null,
  isValid boolean default true,
  isActive boolean default true,
  isDeleted boolean default false,
  createdBy varchar(255),
  modifiedBy varchar(255),
  createdDate datetime default NOW() not null,
  modifiedDate datetime default NOW() not null,
  DBTimeStamp datetime default NOW() not null,
  foreign key(brandId) references Brand(id),
  foreign key(supplierId) references ProductSuppliers(supplierId),
  foreign key(category) references ProductType(id)
);

CREATE TRIGGER generate_paymentId BEFORE INSERT ON Payment
FOR EACH ROW
BEGIN
    DECLARE padded_id VARCHAR(200);
    SET padded_id = LPAD((SELECT COUNT(id) as id FROM Payment), 4, '0'); -- Ensure at least 4 digits, padding with zeros if necessary
    SET NEW.paymentId = CONCAT('RSP', padded_id);
END;

CREATE TRIGGER generateProductId BEFORE INSERT ON Products FOR EACH ROW 
BEGIN
    DECLARE padded_id VARCHAR(200);
    SET padded_id = LPAD((SELECT COUNT(id) as id FROM Products), 4, '0'); -- Ensure at least 4 digits, padding with zeros if necessary
    SET NEW.productId = CONCAT('RSO', padded_id);
END;

CREATE TABLE ProductImages (
  id bigint primary key auto_increment,
  productId varchar(200) not null,
  url varchar(200) not null,
  isValid boolean default true,
  isActive boolean default true,
  isDeleted boolean default false,
  createdBy varchar(255),
  modifiedBy varchar(255),
  createdDate datetime default NOW() not null,
  modifiedDate datetime default NOW() not null,
  DBTimeStamp datetime default NOW() not null,
  foreign key(productId) references Products(productId)
);


CREATE TABLE vr (
  id bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  orderId varchar(200) NOT NULL,
  type enum('before', 'after', 'during') NOT NULL,
  zipURL varchar(200) NOT null,
  url varchar(200),
  isValid boolean default true,
  isActive boolean default false,
  isDeleted boolean default false,
  createdBy varchar(255),
  modifiedBy varchar(255),
  createdDate datetime default NOW() not null,
  modifiedDate datetime default NOW() not null,
  DBTimeStamp datetime default NOW() not null,
  FOREIGN KEY (orderId) REFERENCES Order_(orderId)
);


CREATE TABLE Review (
  id bigint AUTO_INCREMENT PRIMARY KEY NOT NULL,
  customerId bigint NOT NULL,
  rate int NOT NULL,
  feedback text,
  isValid boolean default true,
  isActive boolean default true,
  isDeleted boolean default false,
  createdBy varchar(255),
  modifiedBy varchar(255),
  createdDate datetime default NOW() not null,
  modifiedDate datetime default NOW() not null,
  DBTimeStamp datetime default NOW() not null,
  FOREIGN KEY (customerId) REFERENCES User(id),
  CHECK(rate <= 5)
);

ALTER TABLE Review ADD COLUMN orderId varchar(200) NOT NULL REFERENCES Order_(orderId);
ALTER TABLE Review RENAME COLUMN rate TO rating;



create table Developer (
id bigint primary key auto_increment,
name varchar(255) not null,
email varchar(255) unique not null,
phoneNumber varchar(20) unique not null,
role bigint not null,
isValid boolean default true,
isActive boolean default true,
isDeleted boolean default false,
createdBy varchar(255),
modifiedBy varchar(255),
createdDate datetime default NOW() not null,
modifiedDate datetime default NOW() not null,
DBTimeStamp datetime default NOW() not null,
foreign key (role) references UserRole(id),
CHECK (role = 6)
);

ALTER TABLE Developer ADD COLUMN password varchar(200) not null;


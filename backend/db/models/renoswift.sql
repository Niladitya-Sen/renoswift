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

select * from UserRole;

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

SELECT * FROM Admin;

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

ALTER TABLE UserProperty ADD COLUMN windows int not null;
ALTER TABLE UserProperty ADD COLUMN doors int not null;
ALTER TABLE UserProperty ADD COLUMN height float not null;
ALTER TABLE UserProperty ADD COLUMN area float not null;

ALTER TABLE UserProperty MODIFY COLUMN specialRequest text;

desc UserProperty;

SELECT * FROM  UserProperty up;

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

select * from Quote;

update Quote set status = 'pending' WHERE id = 1;

INSERT INTO Quote(userId, propertyId, name, contactNumber, email, country, state, address, remodelingDate, zipcode)
VALUES (3, 14, 'Niladitya Sen', '7478191802', 'niladityasen.2212@gmail.com', 'India', 'WB', 'XYZ', '2024-03-30', '742101');

select quoteId, createdDate from Quote where userId = 3 ORDER BY createdBy DESC LIMIT 10 OFFSET 10;
drop table Quote;

TRUNCATE table Quote;

SELECT count(id) from Quote;

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

SELECT q.quoteId, q.createdDate, q.propertyId, up.length, up.breadth, 
up.budget, up.issues, up.objective, up.style, up.timeline, up.specialRequest, q.address
FROM Quote as q INNER JOIN UserProperty as up 
WHERE q.quoteId = '63f15cbd-e1ed-11ee-a72a-00155deddf31' AND q.propertyId = up.id AND q.status = 'pending';

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

SELECT * FROM OperationsTeam where isDeleted = false;

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

SELECT * FROM QuoteStatus;
drop table QuoteStatus;

insert into QuoteStatus(quoteId) VALUES ('63f15cbd-e1ed-11ee-a72a-00155deddf31');

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

SELECT * FROM QuoteReply;

UPDATE QuoteReply set amount = 10000 WHERE amount = 0;

TRUNCATE table QuoteReply;

update QuoteReply set designPlan = '/static/pdf/939c9798-9906-4d2a-921f-997bf9e45ea3.pdf',
 quotation = '/static/pdf/d4b1ceaf-89e4-4730-9bf4-259b95726364.pdf' WHERE id = 1;

SELECT
q.quoteId, q.createdDate, q.name, q.email, q.contactNumber, q.propertyId, 
r.customerRemarks, r.teamRemarks, r.timeline, r.designPlan, r.quotation 
FROM Quote as q INNER JOIN QuoteReply as r WHERE q.quoteId = 'RS0001' AND q.quoteId = r.quoteId;

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

drop table Payment;

SELECT * FROM Payment;
SELECT * FROM QuoteReply qr;

DELETE FROM Payment WHERE id = 23;

SELECT p.finalDueDate FROM Payment as p WHERE p.quoteId = 'RS0009' ORDER BY p.createdDate DESC LIMIT 1;

UPDATE Payment p SET p.status = 'done', 
p.finalDueDate = STR_TO_DATE((SELECT qr.timeline FROM QuoteReply qr WHERE qr.quoteId = p.quoteId), '%d/%m/%Y') 
WHERE p.id = 17 AND p.userId = 3;

SELECT o.orderId, o.createdDate, o.status, 
(SELECT SUM(p.amountPaid) FROM Payment as p WHERE o.quoteId = p.quoteId) as amountPaid,
(SELECT SUM(p.amountDue) FROM Payment as p WHERE o.quoteId = p.quoteId) as amountDue
 FROM Order_ as o 
WHERE o.userId = 3 ORDER BY o.createdDate DESC;

UPDATE Payment p SET p.amountDue = 0;

delete from Payment where id = 2;

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

SELECT LAST_INSERT_ID() FROM Payment;

drop trigger generate_paymentId;

SELECT q.quoteId, q.createdDate FROM Quote as q INNER JOIN Payment p 
WHERE q.status = 'sent' AND q.quoteId = p.quoteId AND p.phase != 'order' ORDER BY q.createdBy DESC LIMIT 10 OFFSET 0;

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

SELECT * FROM Order_;

delete from Order_ WHERE id = 2;

SELECT o.orderId, o.createdDate, o.status, 
(SELECT SUM(p.amountPaid) FROM Payment as p WHERE o.quoteId = p.quoteId) as totalAmount FROM Order_ as o WHERE o.userId = 3;

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

drop table OrderStatus;

SELECT * FROM OrderStatus;

SELECT count(id) FROM Payment WHERE quoteId = 'RS0001' AND phase = 'design' OR phase = 'order';

SELECT * FROM OrderStatus;

SELECT s.status, s.remarks, s.createdDate, 
(SELECT imageURL FROM OrderStatusImage as i WHERE i.orderStatusId = s.id) as imageURL FROM OrderStatus as s 
WHERE s.orderId = 'ORD00001' ORDER BY createdDate DESC LIMIT 1; 

SELECT * FROM OperationsTeam WHERE id = 2 AND isDeleted = FALSE;

SELECT status, remarks, createdDate, imageURL FROM OrderStatus 
WHERE orderId = 'ORD00001' AND isCompleted = true ORDER BY createdDate DESC LIMIT 1;

SELECT quoteId, createdDate FROM Quote WHERE status = 'sent' AND userId = 7 ORDER BY createdBy DESC LIMIT 10 OFFSET 0;

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

drop table ProductSuppliers;

CREATE TRIGGER generate_supplierId BEFORE INSERT ON ProductSuppliers
FOR EACH ROW
BEGIN
    DECLARE padded_id VARCHAR(200);
    SET padded_id = LPAD((SELECT COUNT(id) as id FROM ProductSuppliers), 4, '0'); -- Ensure at least 4 digits, padding with zeros if necessary
    SET NEW.supplierId = CONCAT('SP', padded_id);
END;

SELECT * FROM ProductSuppliers;

SELECT supplierId, name, email, phoneNumber, isActive FROM ProductSuppliers ORDER BY createdDate DESC LIMIT 10 OFFSET 0;

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

SELECT * FROM Brand;

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

select * from ProductSupplierBrands;

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

drop table ProductImages;

SELECT * FROM Products, ProductImages;

SELECT DISTINCT supplierId, name FROM ProductSuppliers;

SELECT p.productId, p.name, (SELECT t.type FROM ProductType as t WHERE t.id = p.category) as category, 
(SELECT b.name FROM Brand as b WHERE b.id = p.brandId) as brand, p.isActive 
FROM Products as p WHERE isDeleted = FALSE;

SELECT p.productId, p.name, (SELECT t.type FROM ProductType as t WHERE t.id = p.category) as category, 
(SELECT b.name FROM Brand as b WHERE b.id = p.brandId) as brand, p.isActive, 
(SELECT s.name FROM ProductSuppliers as s WHERE s.supplierId = p.supplierId) as supplier, p.price, p.details 
FROM Products as p WHERE isDeleted = FALSE AND p.productId = 'RSO0000';

SELECT id as statusId, status FROM OrderStatus WHERE orderId = 'ORD00005' 
AND isCompleted = FALSE ORDER BY date ASC LIMIT 1;

SELECT * FROM Order_ o;

SELECT * FROM Quote q;

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

SELECT * FROM vr;
DROP TABLE vr;


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

SELECT * FROM Review r;

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

INSERT INTO Developer (name, email, phoneNumber, role, password) 
VALUES ('Developer', 'dev@renoswift.com', '9876543210', 6, '1234');

SELECT * FROM Developer d;

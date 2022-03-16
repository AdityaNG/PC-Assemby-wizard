drop database pc_assembly;
create database pc_assembly;

\c pc_assembly


CREATE TABLE users(
    uid varchar(7),
    email varchar(32), 
    name varchar(32), 
    phone varchar(32), 
    password varchar(32), 

    PRIMARY KEY (uid)
);

CREATE TABLE Orders(
    uid varchar(7),
    Tracking_Number varchar (32), 
    Oder_ID varchar (32), 

    PRIMARY KEY (uid)
);


CREATE TABLE Favourites(
    uid varchar(7),
    Item_ID varchar (32), 


    PRIMARY KEY (uid)
);

CREATE TABLE Payment_Options(
    uid varchar(7),
    Payment_ID varchar (32), 
    Card_No varchar (12), 
    valid_from date, 
    valid_through date, 
    
    PRIMARY KEY (uid, Payment_ID ),
    FOREIGN KEY (uid) REFERENCES users(uid)
);


CREATE TABLE Reviews(
    uid varchar(7),
    Item_ID varchar (32), 
    Review varchar(256),
    Review_ID varchar(32),

    PRIMARY KEY (uid)
);

CREATE TABLE Items(
    Item_ID varchar(7),
    item_name varchar (512), 
    item_description varchar (512), 
    image_url varchar (512), 
    product_url varchar(512),
    Type_ID varchar (32),
    Price INT,

    PRIMARY KEY (Item_ID)
);

CREATE TABLE Cart(
    uid varchar(7),
    Item_ID varchar(32), 
    Quantity varchar(32), 
    
    PRIMARY KEY (uid)
);
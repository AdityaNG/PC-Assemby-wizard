\c pc_assembly

Copy (Select * From users) To '/var/lib/postgresql/users.csv' With CSV DELIMITER ',' HEADER;
Copy (Select * From Orders) To '/var/lib/postgresql/Orders.csv' With CSV DELIMITER ',' HEADER;
Copy (Select * From Favourites) To '/var/lib/postgresql/Favourites.csv' With CSV DELIMITER ',' HEADER;
Copy (Select * From Payment_Options) To '/var/lib/postgresql/Payment_Options.csv' With CSV DELIMITER ',' HEADER;
Copy (Select * From Reviews) To '/var/lib/postgresql/Reviews.csv' With CSV DELIMITER ',' HEADER;
Copy (Select * From Items) To '/var/lib/postgresql/Items.csv' With CSV DELIMITER ',' HEADER;
Copy (Select * From Cart) To '/var/lib/postgresql/Cart.csv' With CSV DELIMITER ',' HEADER;

SELECT * FROM users WHERE uid = 'input';

SELECT * FROM users WHERE
    email = 'adityang5@gmail.com' 
    AND 
    hashed_password = '12345678' 
    FETCH FIRST 1 ROWS ONLY;

SELECT cart.item_id, cart.quantity FROM 
    users JOIN cart ON users.uid=cart.uid 
    WHERE users.uid='u001';

SELECT CASE WHEN EXISTS (
    SELECT * FROM users WHERE
        email = 'adityang5@gmail.com' 
        AND 
        hashed_password = '12345678' 
        FETCH FIRST 1 ROWS ONLY
)
THEN CAST(1 AS BIT)
ELSE CAST(0 AS BIT) END;

SELECT CASE WHEN EXISTS (
    SELECT * FROM users WHERE
        email = 'adityang5@gmail.com' 
        AND 
        hashed_password = 'wrong_pass' 
        FETCH FIRST 1 ROWS ONLY
)
THEN CAST(1 AS BIT)
ELSE CAST(0 AS BIT) END;

SELECT item_id, item_name, type_id, price FROM items ;

ALTER TABLE items 
    RENAME COLUMN item_id TO item_uuid;

ALTER TABLE items
    ALTER COLUMN price [SET DATA] TYPE INT;

ALTER TABLE users
    ALTER COLUMN uid [SET DATA] TYPE VARCAR(64);

ALTER TABLE items
    ALTER COLUMN item_uuid [SET DATA] TYPE VARCAR(64);

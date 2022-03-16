BEGIN;
    INSERT INTO Payment_Options(uid, Payment_ID, Card_No, valid_from, valid_through) Values(
        'uXXXX', 
        'p1',
        '123456789098',
        '2020-01-01',
        '2024-01-01'
    );
END TRANSACTION;

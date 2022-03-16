\c pc_assembly;

INSERT INTO reviews(UID, Item_ID, review) Values('a12er23', 'davFW313', 'Long text');

INSERT INTO orders(UID, Tracking_Number) Values('a12er23', '9025227971');


INSERT INTO users(uid, email, name, password) Values(
    'u001', 
    'adityang5@gmail.com', 
    'Aditya NG', 
    '12345678'
);

INSERT INTO users(uid, email, name, password) Values(
    'u002', 
    'adiprakash116@gmail.com', 
    'Adithya Prakash', 
    '2768143r2fewdeywdu'
);
INSERT INTO users(uid, email, name, password) Values(
    'u003', 
    'harsh236@gmail.com', 
    'Harshit Kumar', 
    '743865ruihdfbjdhu'
);
INSERT INTO users(uid, email, name, password) Values(
    'u004', 
    'ruchi002@gmail.com', 
    'Ruchi Patel', 
    '762511lojhgbabtss'
);
INSERT INTO users(uid, email, name, password) Values(
    'u005', 
    'akash98@gmail.com', 
    'Akash Mehta', 
    '923461234sdbfskmm'
);


INSERT INTO Payment_Options(uid, Payment_ID, Card_No, valid_from, valid_through) Values(
    'u001', 
    'p001_1',
    '123456789098',
    '2019-01-09',
    '2024-01-01'
);

INSERT INTO Payment_Options(uid, Payment_ID, Card_No, valid_from, valid_through) Values(
    'u001', 
    'p001_2',
    '234755789098',
    '2020-01-01',
    '2024-11-25'
);
INSERT INTO Payment_Options(uid, Payment_ID, Card_No, valid_from, valid_through) Values(
    'u002', 
    'p002_1',
    '657492701846',
    '2018-11-02',
    '2024-11-01'
);
INSERT INTO Payment_Options(uid, Payment_ID, Card_No, valid_from, valid_through) Values(
    'u004', 
    'p004_1',
    '782351984627',
    '2016-12-01',
    '2019-10-06'
);
INSERT INTO Payment_Options(uid, Payment_ID, Card_No, valid_from, valid_through) Values(
    'u005', 
    'p005_1',
    '782735423641',
    '2021-12-13',
    '2025-10-10'
);
INSERT INTO Payment_Options(uid, Payment_ID, Card_No, valid_from, valid_through) Values(
    'u005', 
    'p005_2',
    '923487282362',
    '2019-01-24',
    '2023-04-16'
);





INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '1001',
    'Intel i9-10900k', 
    'Intel Core i9-10900K Processor (20M Cache, up to 5.30 GHz)',
    'https://static.digit.in/default/372a5d6f9bfb1d1debfda00af5f3c122f73c408c.jpeg?tr=w-1200',
    'https://www.amazon.in/Intel®-CoreTM-i9-10900K-Processor-Cache/dp/B086MHSTVD',
    'type_CPU',
    45000
);
INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '2001',
    'GeForce RTX 3090',
    'MSI GeForce RTX 3090 Gaming X Trio 24G I 24GB GDDR6X I 384-bit PCI Express Gen 4 Gaming Graphic Card',
    'https://images-na.ssl-images-amazon.com/images/I/81061ussiIL._SL1500_.jpg',
    'https://www.amazon.com/NVIDIA-RTX-3090-Founders-Graphics/dp/B08HR6ZBYJ',
    'type_GPU',
    202000
);

INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '3001',
    'Motherboard',
    'GIGABYTE AMD A320, AM4 Socket,Ultra Durable Motherboard with Fast Onboard Storage with NVMe,PCIe Gen3 x4 110mm M.2, 4K Ultra HD Support (GA-A320M-S2H)',
    'https://images-na.ssl-images-amazon.com/images/I/815Booiy-2L._SL1500_.jpg',
    'https://www.amazon.in/GIGABYTE-GA-A320M-S2H-Durable-Motherboard-Onboard/dp/B078KBKFZ6/ref=sr_1_3?crid=1LV614KIWY9A0&dchild=1&keywords=motherboard&qid=1607257311&s=computers&sprefix=mother%2Ccomputers%2C301&sr=1-3',
    'type_Motherboard',
    30649
);


INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '4001',
    'WD 500GB',
    'WD Blue PCIe NVMe SSD, 2400MB/s R, 1750MB/s W, 5 Y Warranty, 500GB',
    'https://images-na.ssl-images-amazon.com/images/I/71RTRS3oAjL._SL1500_.jpg',
    'https://www.amazon.in/Western-Digital-SN550-Internal-WDS500G2B0C/dp/B07YFF3JCN/ref=sr_1_7?dchild=1&keywords=SSD+internal&qid=1607257499&s=computers&sr=1-7',
    'type_SSD',
    5706
);
INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '5001',
    'Corsair 16 GB Vengeance',
    'Corsair 16 GB Vengeance LPX DDR4 3000MHz C16 XMP 2.0 Desktop Memory - Black',
    'https://images-na.ssl-images-amazon.com/images/I/716uzH9r6%2BL._SL1500_.jpg',
    'https://www.amazon.in/Corsair-16GB-3000MHz-Memory-Module/dp/B07B4GNMS9/ref=sr_1_3?dchild=1&keywords=16gb+ram&qid=1607257584&s=computers&sr=1-3',
    'type_RAM',
    4899
);
INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '6001',
    'Seagate Barracuda 1TB',
    '1TB HDD 3.5 inch SATA 6GB/s',
    'https://images-na.ssl-images-amazon.com/images/I/71x2h55zNpL._SX466_.jpg',
    'https://www.amazon.in/Seagate-BarraCuda-ST1000DM010-Desktop-Latest/dp/B01LNJBA2I',
    'type_HDD',
    3200
);
INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '6002',
    'Western Digital Blue 1TB',
    '1TB HDD 7200RPM 6GB/sec Hard Disk Drive',
    'https://images-na.ssl-images-amazon.com/images/I/81GdioOBqXL._SL1500_.jpg',
    'https://www.amazon.in/Western-Digital-WD10EZEX-Cache-Internal/dp/B00D0243DU',
    'type_HDD',
    3700
);
INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '5002',
    'Gskill Trident Z RGB 1x8GB',
    'DDR4 3200MHz RAM 8 GB with RGB customization',
    'https://m9m3k2m8.stackpathcdn.com/image/cache/catalog/memory/g%20skill/f4-3200c16s-8gtzr/f4-3200c16s-8gtzr-image-main-600x600.jpg',
    'https://www.amazon.in/G-Skill-F4-3200C16S-8GTZR-Trident-DDR4-3200MHz-CL16-18-18-38/dp/B07MCLQZK9/ref=pd_lpo_147_t_0/262-0316407-4606948?_encoding=UTF8&pd_rd_i=B07MCLQZK9&pd_rd_r=8dedea70-c933-4efc-894c-342f5561f301&pd_rd_w=pwAAn&pd_rd_wg=trzrR&pf_rd_p=5a903e39-3cff-40f0-9a69-33552e242181&pf_rd_r=EBR643SQ9S22836VH7FF&psc=1&refRID=EBR643SQ9S22836VH7FF',
    'type_RAM',
    4600
);
INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '4002',
    'Samsung 970 EVO Plus 250GB M.2 PCIe NVMe',
    '250 GB m.2 high speed SSD',
    'https://images-na.ssl-images-amazon.com/images/I/51Dg-0FirqL._SL1000_.jpg',
    'https://www.amazon.in/Samsung-Internal-Solid-State-MZ-V7S250BW/dp/B07MHXYL6T',
    'type_SSD',
    5000
);

INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '3002',
    'ASUS ROG Strix z490e',
    'Intel® Z490 LGA 1200 ATX gaming motherboard featuring 16 power stages, AI Overclocking, AI Cooling, AI Networking, WiFi 6 (802.11ax), Intel® 2.5 Gb Ethernet, dual M.2 with heatsinks, USB 3.2 Gen 2, SATA and AURA Sync RGB lighting',
    'https://images-na.ssl-images-amazon.com/images/I/91mVz7rmZnL._SL1500_.jpg',
    'https://www.amazon.in/ASUS-ROG-Motherboard-Ethernet-Overclocking/dp/B087Z6PLVF',
    'type_Motherboard',
    33000
);
INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '1002',
    'AMD Ryzen 9 - 5900x',
    'The AMD Ryzen™ 5900X is the ultimate enthusiast processor for gamers, for creators, for everyone. Powerhouse performance for creators. Obliterate multithreaded tasks like 3D rendering, video rendering, and software compiling by taking advantage of 12 cores, 24 threads, and PCIe® 4.0 support.',
    'https://www.somagnews.com/wp-content/uploads/2020/10/amd-ryzen-9-5900x-performansi-ile-sasirtiyor-e1601657566628.jpg',
    'https://mdcomputers.in/amd-ryzen-9-5900x-100-100000061wof.html',
    'type_CPU',
    50000
);
INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '2002',
    'AMD RX 5700 XT',
    'Designed from the ground up for exceptional 1440p performance and high-fidelity gaming',
    'https://images-na.ssl-images-amazon.com/images/I/81CaDQqSOFL._SL1500_.jpg',
    'https://www.amazon.in/Sapphire-Radeon-GDDR6-Triple-Graphics/dp/B07T8C3SM8',
    'type_GPU',
    35000
);

INSERT INTO Items(Item_ID, item_name, item_description, image_URL, product_URL, type_ID, price) Values(
    '2003',
    'GeForce RTX 3080',
    'MSI GeForce RTX 3080 Gaming X Trio 24G I 24GB GDDR6X I 384-bit PCI Express Gen 4 Gaming Graphic Card',
    'https://images-na.ssl-images-amazon.com/images/I/81061ussiIL._SL1500_.jpg',
    'https://www.amazon.com/NVIDIA-RTX-3090-Founders-Graphics/dp/B08HR6ZBYJ',
    'type_GPU',
    202000
);
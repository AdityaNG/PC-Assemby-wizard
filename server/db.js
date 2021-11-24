/**
 * @author adityang5@gmail.com
 * @description Database wrapper for the Offers App
 */

const { v4: uuidv4 } = require('uuid');
const { fromString } = require('uuidv4');

const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    password: '12345678',
    database: 'pc_assembly',
})

client.connect()

module.exports = {
    createUser: createUser,     // DONE
    getUser: getUser,           // DONE
    setUser: setUser,           // DONE
    deleteUser: deleteUser,     // DONE
    searchUsers: searchUsers,   // DONE

    addToCart: addToCart,
    getCart: getCart,
    removeFromCart: removeFromCart,

    createItem: createItem,     // DONE
    getItem: getItem,           // DONE
    setItem: setItem,
    deleteItem: deleteItem,
    searchItems: searchItems,

    getAllTypes: getAllTypes
}


async function createUser(user) {
    name = user.name
    email = user.email
    password = user.password
    return new Promise((reject, resolve) => {

        if (!name)
            reject( {error: "name null"} )

        if (!email)
            reject( {error: "email null"} )

        if (!password)
            reject( {error: "password null"} )

        password = String(password)

        if (password.length<8)
            reject( {error: "password less than 8 chars"} )

        let u = getUser({email: email});
        u.then((search, e) => {    
            if (e) {
                reject(e)
            } else {
                if (search.length == 0) {
                    user_uuid = uuidv4();

                    qry = 'INSERT INTO users(user_uuid, email, name, password) Values(' + to_csv([user_uuid, email, name, password]) + ')'
                    //console.log(qry)
                    client.query(qry).then((v, e) => {
                        if (e) {
                            reject(e)
                        } else {
                            resolve( {user_uuid: user_uuid} )
                        }
                    })   
                } else {
                    reject( {error: "user already exists", 'user':search} )
                }
            }
        }).catch(e => {
            reject(e)
        })
    })
    
}

async function setUser(user) {
    user_uuid = user.user_uuid
    email = user.email
    password = user.password
    name = user.name

    return new Promise((resolve, reject) => {
        let u = getUser({user_uuid: user_uuid, email: email});
        u.then((search, e) => {    
            if (e) {
                reject(e)
            } else {
                if (search.length == 0) {
                    reject( {error: "user does not exist"} );
                } else {
                    // User exists
                    qry = 'UPDATE users SET ' + to_sql_cm({name:name, password: password}) + ' WHERE ' + to_sql({user_uuid: user_uuid, email: email})
                    //console.log(qry)
                    client.query(qry).then((v, e) => {
                        if (e) {
                            reject(e)
                        } else {
                            resolve( {user_uuid: user_uuid} )
                        }
                    }).catch(e => {
                        reject(e)
                    })
                }
            }
        }).catch(e => {
            reject(e)
        })
    });

    let search = getUser({user_uuid: user_uuid});
    if (search==null)
        search = getUser({email: email});

    if (search==null) {
        return {error: "user does not exist"};
    } else {
        //search.user_uuid = search.user_uuid
        //search.email = search.email
        search.password = password
        search.name = name
        /*search = {
            user_uuid: user_uuid,
            email: email,
            password : password,
            meta: search.meta
        }*/

        //db.saveDatabase();
        users.update(search);
        db.saveDatabase();
        return search;
    }
}

async function deleteUser(user) {
    user_uuid = user.user_uuid
    email = user.email
    password = user.password

    return new Promise((resolve, reject) => {
        let u = getUser({user_uuid: user_uuid, email: email, password: password});
        u.then((search, e) => {    
            if (e) {
                reject(e)
            } else {
                if (search.length == 0) {
                    reject( {error: "user does not exist"} );
                } else {
                    qry = 'DELETE FROM users WHERE ' + to_sql({user_uuid: user_uuid, email: email, password: password})
                    //console.log(qry)
                    client.query(qry).then((v, e) => {
                        if (e) {
                            reject(e)
                        } else {
                            resolve( {user_uuid: user_uuid} )
                        }
                    }).catch(e => {
                        reject(e)
                    })
                }
            }
        }).catch(e => {
            reject(e)
        })
    });      
}

async function getUser(params) {
    qry = 'SELECT * FROM users WHERE ' + to_sql(params) + ' FETCH FIRST 1 ROWS ONLY'
    console.log(qry)
    const res = await client.query(qry)
    return res.rows
}

async function searchUsers(params) {
    qry = 'SELECT * FROM users'
    if (Object.keys(params).length != 0)
        qry = 'SELECT * FROM users WHERE ' + to_sql(params)
    //console.log(qry)
    const res = await client.query(qry)
    return res.rows
    
    return users.find(q)
    return users.where(function(obj) {
        if (obj.offerDetails.includes(q) || obj.productDetails.includes(q)) {
            return true;
        }
        return false;
    });
}

async function addToCart(params) {
    item_uuid = params.item_uuid
    user_uuid = params.user_uuid

    qry = 'INSERT INTO cart(item_uuid, user_uuid, quantity) Values(' + to_csv([item_uuid, user_uuid, 1]) + ')'
    //console.log(qry)
    client.query(qry)
}

async function removeFromCart(params) {
    item_uuid = params.item_uuid
    user_uuid = params.user_uuid

    qry = 'DELETE FROM cart WHERE ' + to_sql({item_uuid: item_uuid, user_uuid: user_uuid})
    //console.log(qry)
    client.query(qry)
}


async function getCart(params) {
    //qry = 'SELECT * FROM cart WHERE ' + to_sql(params)
    qry = 'SELECT * FROM cart JOIN items ON cart.item_uuid=items.item_uuid WHERE ' + to_sql(params)
    //console.log(qry)
    const res = await client.query(qry)
    return res.rows
    return carts.findOne(params);
}

function searchCarts(q) {
    return carts.find(q)
    return carts.where(function(obj) {
        if (obj.offerDetails.includes(q) || obj.productDetails.includes(q)) {
            return true;
        }
        return false;
    });
}

function createItem(item) {
    //item_uuid = uuidv4() //item.item_uuid

    return new Promise((reject, resolve) => {

        const item_uuid = fromString(JSON.stringify(item))
        const name = item.name
        const description = item.description
        const imageURL = item.imageURL
        const productURL = item.productURL
        const price = item.price
        const type = item.type
        const type_name = item.type_name

        let u = getItem({item_uuid: item_uuid});
        u.then((search, e) => {    
            if (e) {
                reject(e)
            } else {
                if (search.length == 0) {

                    qry = "INSERT INTO Items(item_uuid, item_name, item_description, imageURL, productURL, type_uuid, type_name, price) Values\(\
                        '" + item_uuid + "',\
                        '" + name + "',\
                        '" + description + "',\
                        '" + imageURL + "',\
                        '" + productURL + "',\
                        '" + type + "',\
                        '" + type_name + "',\
                        " + price + "\)";

                    console.log(qry)
                    client.query(qry).then((v, e) => {
                        if (e) {
                            console.log('problem is came')
                            reject(e)
                        } else {
                            resolve( {item_uuid: item_uuid} )
                        }
                    })   
                } else {
                    console.log('problem is came 2')
                    reject( {error: "item id already exists", 'item':search} )
                }
            }
        }).catch(e => {
            console.log('problem is came 3')
            reject(e)
        })
    })
}

function setItem(item) {
    item_uuid = item.item_uuid
    name = item.name
    description = item.description
    imageURL = item.imageURL
    productURL = item.productURL
    price = item.price
    type = item.type

    let search = getItem({item_uuid: item_uuid})

    if (search==null) {
        return createItem(item)
        //return {error: "item does not exist"};
    } else {
        search.name = item.name
        search.description = item.description
        search.imageURL = item.imageURL
        search.productURL = item.productURL
        search.price = item.price
        search.type = item.type
        
        items.update(search);
        db.saveDatabase();
        return search;
    }
}

function deleteItem(item) {
    item_uuid = item.item_uuid
    name = item.name
    description = item.description
    imageURL = item.imageURL
    productURL = item.productURL
    price = item.price
    type = item.type

    let search = getItem({item_uuid: item_uuid});
    if (search==null) {
        return {error: "item does not exist"};
    }
    items.findAndRemove({item_uuid: item_uuid});
    db.saveDatabase();
    return {status: "successful"};
}

async function getItem(params) {
    qry = 'SELECT * FROM items WHERE ' + to_sql(params) + ' FETCH FIRST 1 ROWS ONLY'
    //console.log(qry)
    const res = await client.query(qry)
    return res.rows
    return items.findOne(params);
}

async function searchItems(params) {
    qry = 'SELECT * FROM items'
    if (Object.keys(params).length != 0)
        qry = 'SELECT * FROM items WHERE ' + to_sql(params)
    console.log(qry)
    const res = await client.query(qry)
    return res.rows
}

function createType(type) {
    //type_uuid = uuidv4() //type.type_uuid
    type_uuid = fromString(JSON.stringify(type))
    name = type.type_name
    
    return new Promise((reject, resolve) => {

        let u = getType({type_uuid: type_uuid});
        u.then((search, e) => {    
            if (e) {
                reject(e)
            } else {
                if (search.length == 0) {

                    qry = "INSERT INTO types(type_uuid, type_name) Values\(\
                        '" + type_uuid + "',\
                        '" + name + "' \)";
                        params
                    //console.log(qry)
                    client.query(qry).then((v, e) => {
                        if (e) {
                            reject(e)
                        } else {
                            resolve( {type_uuid: type_uuid} )
                        }
                    })   
                } else {
                    reject( {error: "type id already exists", 'type':search} )
                }
            }
        }).catch(e => {
            reject(e)
        })
    })
}

function setType(type) {
    type_uuid = type.type_uuid
    name = type.name

    let search = getType({type_uuid: type_uuid});


    if (search==null) {
        return createType(type)
        //return {error: "type does not exist"};
    } else {
        search.name = name
        types.update(search);
        db.saveDatabase();
        return search;
    }
}

function deleteType(type) {
    type_uuid = type.type_uuid
    name = type.name

    let search = getType({type_uuid: type_uuid});
    if (search==null) {
        return {error: "type does not exist"};
    }
    types.findAndRemove({type_uuid: type_uuid});
    db.saveDatabase();
    return {status: "successful"};
}

function getAllTypes() {
    return types
}

async function getType(params) {
    qry = 'SELECT * FROM types WHERE ' + to_sql(params) + ' FETCH FIRST 1 ROWS ONLY'
    //console.log(qry)
    const res = await client.query(qry)
    return res.rows
}

function searchTypes(q) {
    return types.find(q)
    return types.where(function(obj) {
        if (obj.offerDetails.includes(q) || obj.productDetails.includes(q)) {
            return true;
        }
        return false;
    });
}

function searchObjs(q) {
    return users.where(function(obj) {
        if (obj.offerDetails.includes(q) || obj.productDetails.includes(q)) {
            return true;
        }
        return false;
    });
}

/**
 * Generate a random 9 digit ID for database storage
 */
function generateID () {
    return Math.random().toString(36).substr(2, 9);
}

/**
 * EOF
 * All code beyond this point for Dummy Data Generation
 */


/**
 * Called only once to fill up DB with random values
 */
 async function populateDB() {
    //"", "", "", "", "", ""
    //return new Promise((reject, resolve) => {
        q_list = []
        types_dummy = ["CPU", "GPU", "Motherboard", "HDD", "SSD", "RAM"]
    
        //setArea(ar);
        for (j in dummy_data) {
            //console.log(dummy_data[j])
            //print()
            for (var k=0; k<dummy_data[j].data.length; k++) {
                for (var i=0; i<1; i++) {
                    console.log(dummy_data[j].data[k].name)
                    // /*
                    q_list.push(createItem({
                        //item_uuid: item_uuid,
                        name: dummy_data[j].data[k].name,
                        description: dummy_data[j].data[k].description,
                        imageURL: dummy_data[j].data[k].imageURL,
                        productURL: dummy_data[j].data[k].productURL,
                        price: dummy_data[j].data[k].price,
                        type: dummy_data[j].type,
                        type_name: dummy_data[j].type
                    }))
                    // */
                    /*
                    q_list.push( new Promise((reject, resolve) => {
                        createItem({
                            //item_uuid: item_uuid,
                            name: dummy_data[j].data[k].name,
                            description: dummy_data[j].data[k].description,
                            imageURL: dummy_data[j].data[k].imageURL,
                            productURL: dummy_data[j].data[k].productURL,
                            price: dummy_data[j].data[k].price,
                            type: dummy_data[j].type,
                            type_name: dummy_data[j].type
                        }).then(function(v, e) {
                            console.log('success populateDB 1')
                            resolve()
                        }).catch(e => {
                            console.log('error populateDB 1')
                            reject(e)
                        });
                    }))
                     */
                }
            }  
        }
        
        return q_list
        //resolve('Done')
    //})
}

async function populateDB_old() {
    //"", "", "", "", "", ""
    //return new Promise((reject, resolve) => {
        q_list = []
        types_dummy = ["CPU", "GPU", "Motherboard", "HDD", "SSD", "RAM"]
    
        //setArea(ar);
        for (j in dummy_data) {
            //console.log(dummy_data[j])
            //print()
            q_list.push( new Promise((reject, resolve) => {
                getType({type_name: dummy_data[j].type}).then(type_dummy => {
                    //var type_dummy = getType({type_name: dummy_data[j].type})
                    //var type_dummy = null
                    
                    //console.log("Res : ")
                    //console.log(type_dummy)
                    if (type_dummy.length == 0) {
                        createType({
                            type_name: dummy_data[j].type
                        }).then(type_dummy_id => {
                            for (var k=0; k<dummy_data[j].data.length; k++) {
                                for (var i=0; i<1; i++)
                                    createItem({
                                        //item_uuid: item_uuid,
                                        name: dummy_data[j].data[k].name,
                                        description: dummy_data[j].data[k].description,
                                        imageURL: dummy_data[j].data[k].imageURL,
                                        productURL: dummy_data[j].data[k].productURL,
                                        price: dummy_data[j].data[k].price,
                                        type: type_dummy_id,
                                        type_name: dummy_data[j].type
                                    }).then(function(v, e) {
                                        console.log('success populateDB 1')
                                        resolve()
                                    }).catch(e => {
                                        console.log('error populateDB 1')
                                        reject(e)
                                    });
                            }  
                        })
                    } else {
                        type_dummy_id = type_dummy[0].type_uuid
                        //setStore(ar, st, t1[randInt(0,3)] + " " + t2[randInt(0,3)] + " " + t3[randInt(0,3)]);
                        for (var k=0; k<dummy_data[j].data.length; k++) {
                            for (var i=0; i<1; i++)
                                createItem({
                                    //item_uuid: item_uuid,
                                    name: dummy_data[j].data[k].name,
                                    description: dummy_data[j].data[k].description,
                                    imageURL: dummy_data[j].data[k].imageURL,
                                    productURL: dummy_data[j].data[k].productURL,
                                    price: dummy_data[j].data[k].price,
                                    type: type_dummy_id,
                                    type_name: dummy_data[j].type
                                }).then(function(v, e) {
                                    console.log('success populateDB 2')
                                    resolve()
                                }).catch(e => {
                                    console.log('error populateDB 2')
                                    reject(e)
                                });
                        }  
                    }
                }).catch(e => {
                    console.log('error populateDB 3')
                    reject(e)
                })   
            }))
        }
        
        return q_list
        //resolve('Done')
    //})
}

function to_sql(args) {
    res = ""
    ents = Object.entries(args)
    for (i=0; i<ents.length; i++) {
        key = ents[i][0]
        val = ents[i][1]

        if (typeof(val) == 'string')
            res += key + "='" + val + "'"
        else
            res += key + "=" + String(val)

        if (i<ents.length-1)
            res += ' AND '
    }
    return res
}

function to_sql_cm(args) {
    res = ""
    ents = Object.entries(args)
    for (i=0; i<ents.length; i++) {
        key = ents[i][0]
        val = ents[i][1]

        if (typeof(val) == 'string')
            res += key + "='" + val + "'"
        else
            res += key + "=" + String(val)

        if (i<ents.length-1)
            res += ', '
    }
    return res
}

function to_csv(args) {
    res = ""
    for (i=0; i<args.length; i++) {
        val = args[i]
        if (typeof(val) == 'string')
            res += "'" + val + "'"
        else
            res += String(val)
        if (i<args.length-1)
            res += ', '
    }
    return res
}

/**
 * Returns a random element from the given array
 * @param {array} arr 
 */
function randEle (arr) {
    return arr[randInt(0,arr.length-1)];
}

/**
  * Returns a random integer between min (inclusive) and max (inclusive).
  * The value is no lower than min (or the next integer greater than min
  * if min isn't an integer) and no greater than max (or the next integer
  * lower than max if max isn't an integer).
  * Using Math.round() will give you a non-uniform distribution!
  * @param {Number} min 
  * @param {Number} max 
  */
function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let dummy_data2 = [
    {
        type: "CPU",
        data: [
            {
                name: "Intel i9",
                description: "Intel® Core™ i9-9900K Processor (16M Cache, up to 5.00 GHz)",
                imageURL: "https://images-na.ssl-images-amazon.com/images/I/9115KaKEf5L._SX679_.jpg",
                productURL: "https://www.amazon.in/Intel-16-Thread-BX80684I99900K-Processor-Graphics/dp/B005404P9I/ref=sr_1_1?adgrpid=67454028468&dchild=1&ext_vrnc=hi&gclid=CjwKCAiAn7L-BRBbEiwAl9UtkFIVudT8qeV1ZpTJ5b2RcKdJ-SnbnNsqPqIYLA58GhF3tsdu4pH8pxoChMoQAvD_BwE&hvadid=294115396047&hvdev=c&hvlocphy=9062077&hvnetw=g&hvqmt=e&hvrand=14780019429929349787&hvtargid=kwd-299445300653&hydadcr=27811_1815119&keywords=intel+i9&qid=1607257093&sr=8-1&tag=googinhydr1-21",
                price: "Rs. 32,000"
            }
        ]
    },
    {
        type: "GPU",
        data: [
            {
                name: "GeForce RTX 3090",
                description: "MSI GeForce RTX 3090 Gaming X Trio 24G I 24GB GDDR6X I 384-bit PCI Express Gen 4 Gaming Graphic Card",
                imageURL: "https://images-na.ssl-images-amazon.com/images/I/81061ussiIL._SL1500_.jpg",
                productURL: "https://www.amazon.in/MSI-GeForce-3090-24G-384-bit/dp/B08HM6D7TM/ref=asc_df_B08HM6D7TM/?tag=googleshopdes-21&linkCode=df0&hvadid=397083603974&hvpos=&hvnetw=g&hvrand=5167228311977899608&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9062077&hvtargid=pla-1009239005509&psc=1&ext_vrnc=hi",
                price: "Rs. 2,02,000"
            }
        ]
    },
    {
        type: "Motherboard",
        data: [
            {
                name: "Gigabyte AMD",
                description: "GIGABYTE AMD A320, AM4 Socket,Ultra Durable Motherboard with Fast Onboard Storage with NVMe,PCIe Gen3 x4 110mm M.2, 4K Ultra HD Support (GA-A320M-S2H)",
                imageURL: "https://images-na.ssl-images-amazon.com/images/I/815Booiy-2L._SL1500_.jpg",
                productURL: "https://www.amazon.in/GIGABYTE-GA-A320M-S2H-Durable-Motherboard-Onboard/dp/B078KBKFZ6/ref=sr_1_3?crid=1LV614KIWY9A0&dchild=1&keywords=motherboard&qid=1607257311&s=computers&sprefix=mother%2Ccomputers%2C301&sr=1-3",
                price: "Rs. 4,649"
            }
        ]
    },
    {
        type: "SSD",
        data: [
            {
                name: "WD 500GB",
                description: "WD Blue PCIe NVMe SSD, 2400MB/s R, 1750MB/s W, 5 Y Warranty, 500GB",
                imageURL: "https://images-na.ssl-images-amazon.com/images/I/71RTRS3oAjL._SL1500_.jpg",
                productURL: "https://www.amazon.in/Western-Digital-SN550-Internal-WDS500G2B0C/dp/B07YFF3JCN/ref=sr_1_7?dchild=1&keywords=SSD+internal&qid=1607257499&s=computers&sr=1-7",
                price: "Rs. 5,706"
            }
        ]
    },
    {
        type: "HDD",
        data: [
            {
                name: "Consistent 320GB",
                description: "Consistent Hard Disk 320GB, Desktop",
                imageURL: "https://images-na.ssl-images-amazon.com/images/I/51gVORm3bKL.jpg",
                productURL: "https://www.amazon.in/Consistent-Hard-Disk-320GB-Desktop/dp/B08HKB7C4L/ref=sr_1_3?dchild=1&keywords=hard+disk+internal&qid=1607257392&s=computers&sr=1-3",
                price: "Rs. 1,150"
            }
        ]
    },
    {
        type: "RAM",
        data: [
            {
                name: "Corsair 16 GB Vengeance",
                description: "Corsair 16 GB Vengeance LPX DDR4 3000MHz C16 XMP 2.0 Desktop Memory - Black",
                imageURL: "https://images-na.ssl-images-amazon.com/images/I/716uzH9r6%2BL._SL1500_.jpg",
                productURL: "https://www.amazon.in/Corsair-16GB-3000MHz-Memory-Module/dp/B07B4GNMS9/ref=sr_1_3?dchild=1&keywords=16gb+ram&qid=1607257584&s=computers&sr=1-3",
                price: "Rs. 4,899"
            }
        ]
    }
]

let dummy_data = [
{
    type: "CPU",
    data: [
        {
            name: "Intel i9-10900k",
            description: "Intel Core i9-10900K Processor (20M Cache, up to 5.30 GHz)",
            imageURL: "https://static.digit.in/default/372a5d6f9bfb1d1debfda00af5f3c122f73c408c.jpeg?tr=w-1200",
            productURL: "https://www.amazon.in/Intel®-CoreTM-i9-10900K-Processor-Cache/dp/B086MHSTVD",
            price: "45000"
        },
        {
            name: "Intel i7-10700k",
            description: "i7-10700K Intel Core Desktop Processor 8 Cores up to 5.1 GHz, 125W.",
            imageURL: "https://tpucdn.com/cpu-specs/images/chips/2215-front.jpg",
            productURL: "https://www.amazon.in/Intel-i7-10700K-Desktop-Processor-Unlocked/dp/B086ML4XSB",
            price: "30000"
        },
        {
            name: "Intel i5-10600k",
            description: "The Intel Core i5-10600K is a six-core/12-thread CPU with an Intel UHD Graphics 630 integrated graphics processor (IGP), a TDP of 125 watts, and a 4.1GHz base clock.",
            imageURL: "https://www.techspot.com/articles-info/2031/images/2020-05-25-image-2.jpg",
            productURL: "https://www.amazon.in/Intel®-CoreTM-i5-10600K-Processor-Cache/dp/B086MHSH2C",
            price: "22500"
        },
        {
            name: "AMD Ryzen 9 - 5900x",
            description: "The AMD Ryzen™ 5900X is the ultimate enthusiast processor for gamers, for creators, for everyone. Powerhouse performance for creators. Obliterate multithreaded tasks like 3D rendering, video rendering, and software compiling by taking advantage of 12 cores, 24 threads, and PCIe® 4.0 support.",
            imageURL: "https://www.somagnews.com/wp-content/uploads/2020/10/amd-ryzen-9-5900x-performansi-ile-sasirtiyor-e1601657566628.jpg",
            productURL: "https://mdcomputers.in/amd-ryzen-9-5900x-100-100000061wof.html",
            price: "50000"
        },
        {
            name: "AMD Ryzen 7 - 5800x",
            description: "The AMD Ryzen 7 5800X is an 8-core, 16-thread processor that operates with a 3.8GHz base frequency and 4.7GHz maximum boost with a 105W TDP.",
            imageURL: "https://www.amd.com/system/files/2020-09/616656-amd-ryzen-7-5000-series-PIB-1260x709_0.png",
            productURL: "https://www.amazon.com/AMD-Ryzen-5800X-16-Thread-Processor/dp/B0815XFSGK",
            price: "40000"
        },
        {
            name: "AMD Ryzen 5 - 5600x",
            description: "The Ryzen 5 5600X is a six-core, 12-thread processor with a base clock of 3.7GHz and max boost of 4.6GHz.",
            imageURL: "https://www.amd.com/system/files/2020-09/616656-amd-ryzen-5-5000-series-PIB-fan-1260x709.png",
            productURL: "https://mdcomputers.in/amd-ryzen-5-5600x-100-100000065box.html",
            price: "27500"
        }
    ]
},
{
type: "GPU",
data: [
{
    name: "Nvidia RTX 2080",
            description: "The GeForce RTX 2080 is an enthusiast-class graphics card by NVIDIA. Built on the 12 nm process, and based on the TU104 graphics processor, in its TU104-400A-A1 variant, the card supports DirectX 12 Ultimate. ",
            imageURL: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/geforce-rtx-turing/2080/gallery/geforce-rtx-2080-gallery-c.jpg",
            productURL: "https://www.nvidia.com/en-in/geforce/graphics-cards/rtx-2080/",
            price: "60000"
},
{
            name: "Nvidia RTX 3080",
            description: "The GeForce RTX 3080 delivers the ultra performance that gamers crave, powered by Ampere—NVIDIA's 2nd gen RTX architecture. It's built with enhanced RT Cores and Tensor Cores, new streaming multiprocessors, and superfast G6X memory for an amazing gaming experience",
            imageURL: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3080/images/design/geforce-rtx-3080-4-960.jpg",
            productURL: "https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3080/",
            price: "70000"
        },
{
            name: "Nvidia RTX 3060",
            description: "The GeForce RTX 3060 Ti card can support both 1080p and 1440p resolution gaming, both of which are facilitated by Nvidia's Deep Learning Super Sampling tech.",
            imageURL: "https://cdn.vox-cdn.com/thumbor/0esS-FNowBpuDVjq7uvGjkTGAS0=/0x0:2640x1749/1200x800/filters:focal(1109x664:1531x1086)/cdn.vox-cdn.com/uploads/chorus_image/image/68249799/twarren_rtx3060_ti_5.0.jpg",
            productURL: "https://www.nvidia.com/en-in/geforce/graphics-cards/30-series/rtx-3060-ti/",
            price: "36000"
        },
{
            name: "AMD Radeon RX VEGA 56",
            description: "AMD has paired 8 GB HBM2 memory with the Radeon RX Vega 56, which are connected using a 2048-bit memory interface. The GPU is operating at a frequency of 1156 MHz, which can be boosted up to 1471 MHz, memory is running at 800 MHz.",
            imageURL: "https://www.asus.com/media/IN/products/UVcXdDUc7cyODBDb/P_setting_000_1_90_end_500.png",
            productURL: "https://www.amazon.in/Asus-Overclocked-2048-Bit-Express-STRIX-RXVEGA64-O8G-Gaming/dp/B0782PSHJ3",
            price: "60000"
        },
{
            name: "AMD RX 5600 XT",
            description: "The Radeon RX 5600 XT is AMD's answer to the budget mainstream video card segment, and is designed to be their ultimate 1080p gaming card.",
            imageURL: "https://m.media-amazon.com/images/I/81R+5cDWfQL._AC_SS350_.jpg",
            productURL: "https://www.amazon.in/GIGABYTE-Graphics-192-Bit-GV-R56XTGAMING-OC-6GD/dp/B083X25J8C",
            price: "25000"
        },
{
            name: "AMD RX 5700 XT",
            description: "Designed from the ground up for exceptional 1440p performance and high-fidelity gaming.",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/81CaDQqSOFL._SL1500_.jpg",
            productURL: "https://www.amazon.in/Sapphire-Radeon-GDDR6-Triple-Graphics/dp/B07T8C3SM8",
            price: "35000"
        },
]
},
{
type: "Motherboard",
data: [
    {
            name: "ASUS ROG Strix z490e",
            description: "Intel® Z490 LGA 1200 ATX gaming motherboard featuring 16 power stages, AI Overclocking, AI Cooling, AI Networking, WiFi 6 (802.11ax), Intel® 2.5 Gb Ethernet, dual M.2 with heatsinks, USB 3.2 Gen 2, SATA and AURA Sync RGB lighting",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/91mVz7rmZnL._SL1500_.jpg",
            productURL: "https://www.amazon.in/ASUS-ROG-Motherboard-Ethernet-Overclocking/dp/B087Z6PLVF",
            price: "33000"
        },
    {
            name: "MSI z490-A Pro",
            description: " Featuring stable functionality and high-quality assembly, PRO series motherboards provide not only optimized professional workflows but also less troubleshooting and longevity.",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/91%2BdqtH92DL._SX466_.jpg",
            productURL: "https://www.amazon.in/MSI-Z490-PRO-Gaming-Motherboard/dp/B0886R2VJW",
            price: "16000"
        },
    {
            name: "Gigabyte Z490 AORUS ELITE",
            description: "Intel Z490 AORUS Motherboard with Direct 12 Phase Digital VRM Design, Comprehensive Thermal Solution with Enlarged Surface Heatsink, 2.5GbE LAN, RGB FUSION 2.0",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/81igmJilGcL._SX355_.jpg",
            productURL: "https://www.amazon.in/GIGABYTE-Z490-AORUS-AC-802-11ac/dp/B087GFYBCW",
            price: "24000"
        },
    {
            name: "Gigabyte X570 AORUS MASTER AMD X570",
            description: "AMD X570 AORUS Motherboard with Direct 14 Phase Infineon Digital VRM, Fins-Array Heatsink & Direct Touch Heatpipe, Triple PCIe 4.0 M.2 with Thermal Guards, Intel® WiFi 6 802.11ax, ESS SABRE HiFi 9118, 2.5GbE+1GbE LAN, USB Type-C, RGB Fusion 2.0",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/61cqpJpttJL._SL1000_.jpg",
            productURL: "https://www.amazon.in/GIGABYTE-X570-AORUS-Master-Motherboard/dp/B07TTP5J1K",
            price: "38000"
        },
    {
            name: "ASRock X570 Phantom Gaming",
            description: "Supports AMD AM4 Socket Ryzen™ 2000 and 3000 Series processors,10 Power Phase Design",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/815bPBFTuBL._SL1500_.jpg",
            productURL: "https://www.amazon.in/ASRock-X570-Phantom-Gaming-Motherboard/dp/B07TGHV63W",
            price: "18500"
        },
    {
            name: "ASUS TUF X570-PL",
            description: "Motherboard with PCIe 4.0, Dual M.2, 14 Dr. MOS Power Stages, HDMI, DP, SATA 6Gb/s, USB 3.2 Gen 2 and Aura Sync RGB Lighting",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/71qaGITwWLL._SL1280_.jpg",
            productURL: "https://www.amazon.in/Asus-TUF-X570-PLUS-Motherboard-Lighting/dp/B07SXFK1TP",
            price: "20000"
        }
]
},
{
    type: "SSD",
    data: [
        {
            name: "Samsung 970 EVO Plus 250GB M.2 PCIe NVMe",
            description: "250 GB m.2 SSD",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/51Dg-0FirqL._SL1000_.jpg",
            productURL: "https://www.amazon.in/Samsung-Internal-Solid-State-MZ-V7S250BW/dp/B07MHXYL6T",
            price: "5000"
        },
        {
            name: "WD Blue 500GB 3D NAND SATA III",
            description: "500 GB SATA SSD, 2.5 inch",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/31rjnHD-cEL.jpg",
            productURL: "https://www.amazon.in/500GB-Internal-Solid-State-WDS500G2B0B/dp/B073SBX6TY",
            price: "5400"
        } ,
        {
            name: "WD Blue SN550 1TB",
            description: "1TB M.2 SSD PCI Express 3.0 x4 ",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/717CYNF05hL._SX450_.jpg",
            productURL: "https://www.pcstudio.in/product/wd-blue-1tb-sn550-nvme-m2-2280-ssd/",
            price: "11000"
        },
        {
            name: "Kingston A2000 500GB M.2",
            description: "A2000 is an affordable solution with impressive read/write speeds up to 2,200/2,000MB/s",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/61pPxO2lwnL._SL1200_.jpg",
            productURL: "pr1oductURL",
            price: "5700"
        },
        {
            name: "Kingston A400 2.5 inch 120GB",
            description: "Fast start-up, loading and file transfers",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/71v2CC1y-SL._SL1500_.jpg",
            productURL: "https://www.amazon.in/Kingston-SSDNow-Internal-SA400S37-120GIN/dp/B079T88WY5",
            price: "2000"
        },
        {
            name: "ADATA FALCON 1TB PCIe Gen3x4 M.2 2280 ",
            description: "Using the PCIe Gen3x4 interface and equipped with 3D NAND Flash memory, the FALCON delivers read/write speed of up to 3100/1500MB per second",
            imageURL: "https://www.adata.com/upload/ProductGallery/productGallery7451.jpg",
            productURL: "https://www.amazon.in/DATA-Falcon-Gen3x4-Solid-State/dp/B0896WX1GK",
            price: "12000"
        }
    ]
},
{
    type: "RAM",
    data: [
        {
            name: "Corsair Vengeance LPX 8GB (8GBx1) 3200MH",
            description: "1 stick of 8GB DDR4 RAM clocked at 3200 MHz",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/511QDSquq0L._SX466_.jpg",
            productURL: "https://www.amazon.in/CORSAIR-Vengeance-1x8GB-3200MHZ-Desktop/dp/B07PNW4Q3F",
            price: "3500"
        }, 
        {
            name: "Corsair Vengeance LPX 16GB (16GBx1) 3200MHz",
            description: "Each VENGEANCELPX module is built with a pure aluminum heatspreaderfor faster heat dissipation and cooler operation; and the custom performancePCB helps manage heat and provides superior overclocking headroom.",
            imageURL: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_600,h_600/https://techmartunbox.com/wp-content/uploads/2019/08/VENG_LPX_BLK_01-600x600-600x600.jpg",
            productURL: "https://www.amazon.in/CORSAIR-Vengeance-1x16GB-3200MHZ-Desktop/dp/B07W8ZDDKT/ref=pd_lpo_147_t_1/262-0316407-4606948?_encoding=UTF8&pd_rd_i=B07W8ZDDKT&pd_rd_r=f582d9da-e324-4b97-b9c9-46d19540b01b&pd_rd_w=VrfVu&pd_rd_wg=obLrb&pf_rd_p=5a903e39-3cff-40f0-9a69-33552e242181&pf_rd_r=H5STN5NMY1PF25KAA587&psc=1&refRID=H5STN5NMY1PF25KAA587",
            price: "5200"
        },
        {
            name: "Gskill Trident Z RGB 1x8GB",
            description: "DDR4 3200MHz RAM 8 GB with RGB customization",
            imageURL: "https://m9m3k2m8.stackpathcdn.com/image/cache/catalog/memory/g%20skill/f4-3200c16s-8gtzr/f4-3200c16s-8gtzr-image-main-600x600.jpg",
            productURL: "https://www.amazon.in/G-Skill-F4-3200C16S-8GTZR-Trident-DDR4-3200MHz-CL16-18-18-38/dp/B07MCLQZK9/ref=pd_lpo_147_t_0/262-0316407-4606948?_encoding=UTF8&pd_rd_i=B07MCLQZK9&pd_rd_r=8dedea70-c933-4efc-894c-342f5561f301&pd_rd_w=pwAAn&pd_rd_wg=trzrR&pf_rd_p=5a903e39-3cff-40f0-9a69-33552e242181&pf_rd_r=EBR643SQ9S22836VH7FF&psc=1&refRID=EBR643SQ9S22836VH7FF",
            price: "4600"
        },
        {
            name: "HyperX Fury 8GB",
            description: "1x8 DDR4 3200 MHz RAM",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/71%2ByJbBOZCL._SL1500_.jpg",
            productURL: "https://www.amazon.in/HyperX-3200MHz-Desktop-Memory-HX432C16FB3/dp/B07WJJ9CNG",
            price: "3400"
        },
        {
            name: "ADATA XPG Gammix D30 Series 8GB",
            description: "Whether you’re a gamer, PC enthusiast, or overclocker, you’ll appreciate the combination of the GAMMIX D30’s edgy wing-shaped design and excellent speeds",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/71nCtWUn-TL._SX466_.jpg",
            productURL: "https://www.amazon.in/XPG-GAMMIX-3000Mhz-U-DIMM-Desktop/dp/B07MT7TJFV",
            price: "2900"
        },
         {
            name: "ADATA XPG SPECTRIX D60G Series 16GB",
            description: "The XPG SPECTRIX D60G DDR4 3600 MHz memory features a unique dual RGB light strip design",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/51%2B-HsUlv0L._SL1000_.jpg",
            productURL: "https://www.amazon.in/XPG-SPECTRIX-3000MHZ-U-DIMM-Desktop/dp/B07QNZXKZ4",
            price: "price"
        }
    ]
},
{
    type: "HDD",
    data: [
        {
            name: "Seagate Barracuda 1TB",
            description: "1TB HDD 3.5 inch SATA 6GB/s",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/71x2h55zNpL._SX466_.jpg",
            productURL: "https://www.amazon.in/Seagate-BarraCuda-ST1000DM010-Desktop-Latest/dp/B01LNJBA2I",
            price: "3200"
        }, 
        {
            name: "Western Digital Blue 1TB",
            description: "1TB HDD 7200RPM 6GB/sec",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/81GdioOBqXL._SL1500_.jpg",
            productURL: "https://www.amazon.in/Western-Digital-WD10EZEX-Cache-Internal/dp/B00D0243DU",
            price: "3700"
        },
        {
            name: "Seagate IronWolf 4TB",
            description: "4 TB NAS Internal Hard Drive HDD – 3.5 Inch SATA 6 Gb/s 5900 RPM 64 MB Cache for RAID ",
            imageURL: "https://m.media-amazon.com/images/I/417wBljQGCL.jpg",
            productURL: "https://www.amazon.in/Seagate-IronWolf-Internal-Drive-ST4000VN008/dp/B01LOOJBQY",
            price: "10500"
        },
        {
            name: "Western Digital Blue 2TB",
            description: "2TB 5.4K RPM 3.5 SATA",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/51Wt158ZJAL._SY355_.jpg",
            productURL: "https://www.amazon.in/Western-Digital-Blue-WD20EZRZ-Silver/dp/B074TT5XXB",
            price: "6800"
        },
        {
            name: "Seagate Skyhawk 2TB",
            description: "2TB Internal Hard Drive HDD – 3.5 Inch SATA HDD",
            imageURL: "https://m.media-amazon.com/images/I/51EW-dzxJTL.jpg",
            productURL: "https://www.amazon.in/Seagate-Skyhawk-Lite-SATA-ST2000VX007/dp/B07N3P8RP8",
            price: "5000"
        },
        {
            name: "Toshiba P300 2TB",
            description: "2TB 3.5 inch 7200 RPM High-Performance Desktop Hard Drive",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/81hvN3-ZPEL._SY450_.jpg",
            productURL: "https://www.amazon.in/Toshiba-Desktop-7200rpm-Internal-Drive/dp/B013JPKT9O",
            price: "5500"
        }
    ]
}]

function wait_for_qlist(q_list, i) {
    return new Promise((reject, resolve) => {
        console.log('wait_for_qlist : ' + i)
        //console.log(q_list[i])
        q_list[i].then(function(v, e) {
            //console.log(v)
            if (e) {
                console.log("error in wait_for_qlist")
            } else {
                //console.log(v)
                if (i+1 < q_list.length) {
                    wait_for_qlist(q_list, i+1).then(function(v1, e1) {
                        resolve()
                    }).catch(e2 => {
                        reject('e2'+i)
                    })
                } else {
                    resolve()
                }
            }
        }).catch(e3 => {
            reject('e3'+i)
        })
    })
}

function wait_for_all() {
    q_list = populateDB()
    console.log('q_list')
    console.log(q_list)
    q_list.then(function(q_list_resolved, e1) {
        wait_for_qlist(q_list_resolved, 0).then(function(v, e) {
            console.log('Done wait_for_qlist')
            //client.end()
        }).catch(e1 => {
            console.log('wait_for_all e1')
            //client.end()
        })
    }).catch(e2 => {
        console.log('wait_for_all e2')
    })
    
}

if (require.main === module) {
    wait_for_all()
}

/*
populateDB().then(function(v, e) {
    console.log(v)
    client.end()
}).catch(e => {
    console.log(e)
    client.end()
})
// */

/*
createType({
    type_name: "CPU"
}).then(function(v, e) {
    console.log(v)
    client.end()
}).catch(e => {
    console.log(e)
    client.end()
})
// */

 /*
getType({type_uuid: "1001"}).then(function(v, e) {
    console.log(v)
    client.end()
}).catch(e => {
    console.log(e)
    client.end()
})
// */

/*
p = createItem({
    name: "Toshiba P300 2TB",
    description: "2TB 3.5 inch 7200 RPM High-Performance Desktop Hard Drive",
    imageURL: "https://images-na.ssl-images-amazon.com/images/I/81hvN3-ZPEL._SY450_.jpg",
    productURL: "https://www.amazon.in/Toshiba-Desktop-7200rpm-Internal-Drive/dp/B013JPKT9O",
    price: 5500,
    type: '4',
    type_name: 'HDD'
}).then(function(v, e) {
    console.log(v)
    client.end()
}).catch(e => {
    console.log(e)
    client.end()
})
// */

/*
getItem({item_uuid: "1001"}).then(function(v, e) {
    console.log(v)
    client.end()
}).catch(e => {
    console.log(e)
    client.end()
})
// */

/*
p = deleteUser({user_uuid: 'f639ef48-f022-4baa-a59b-30dc5eef5cee' , name: 'Sfrvekasdc', email: 'adfad@dvsw.com', password: 'passeqr1fe23r1e'}).then(function(v, e) {
    console.log(v)
    client.end()
}).catch(e => {
    console.log(e)
    client.end()
})
// */

/*
p = createUser({name: 'Sfrvekasdc', email: 'adfad@dvsw.com', password: 'passeqr1fe23r1e'}).then(function(v, e) {
    console.log(v)
    client.end()
}).catch(e => {
    console.log(e)
    client.end()
})
// */

/*
setUser({user_uuid: "u001", email: "adityang5@gmail.com", name: "Aditya NG", password: "new_passefqf"}).then(function(v, e) {
    console.log(v)
    searchUsers({user_uuid: "u001"}).then(function(v, e) {
        console.log(v)
        client.end()
    }).catch(e => {
        console.log(e)
        client.end()
    })
}).catch(e => {
    console.log(e)
    client.end()
})
//*/

/*
searchUsers({name: "Aditya NG"}).then(function(v, e) {
    console.log(v)
    client.end()
}).catch(e => {
    console.log(e)
    client.end()
})
//*/

 /*
getUser({name: "Aditya NG"}).then(function(v, e) {
    console.log(v)
    client.end()
}).catch(e => {
    console.log(e)
    client.end()
})
//*/
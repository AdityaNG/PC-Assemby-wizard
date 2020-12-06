/**
 * @author adityang5@gmail.com
 * @description Database wrapper for the Offers App
 */

const { v4: uuidv4 } = require('uuid');

const loki = require('lokijs');
const db = new loki('./project_databse.json');

let users = db.addCollection('users');
let carts = db.addCollection('cart');
let items = db.addCollection('items');
let types = db.addCollection('type');
let categorys = db.addCollection('category');

db.loadDatabase({}, function () {
   
    users = db.addCollection('users');
    cart = db.addCollection('cart');
    items = db.addCollection('items');
    type = db.addCollection('type');
    category = db.addCollection('category');
    //Use this for Dummy Data Generation
    //populateDB();
});


module.exports = {
    createUser: createUser,
    getUser: getUser,
    setUser: setUser,
    deleteUser: deleteUser,
    searchUsers: searchUsers,

    createCart: createCart,
    getCart: getCart,
    setCart: setCart,
    deleteCart: deleteCart,
    searchCarts: searchCarts,

    createItem: createItem,
    getItem: getItem,
    setItem: setItem,
    deleteItem: deleteItem,
    searchItems: searchItems,

    getAllTypes: getAllTypes
}


function createUser(user) {
    email = user.email
    password = user.password
    let search = getUser({email: email});
    
    if (!email)
        return {error: "email null"}

    if (!password)
        return {error: "password null"}

    password = String(password)

    if (password.length<8)
        return {error: "password less than 8 chars"}

    if (search==null) {
        user_uuid = uuidv4();

        users.insert({
            user_uuid: user_uuid,
            email: email,
            password : password
        })

        db.saveDatabase()
        
        return {user_uuid: user_uuid}
    } else {
        return {error: "user already exists"}
    }
}

function setUser(user) {
    user_uuid = user.user_uuid
    email = user.email
    password = user.password

    let search = getUser({user_uuid: user_uuid});
    if (search==null)
        search = getUser({email: email});

    if (search==null) {
        return {error: "user does not exist"};
    } else {
        //search.user_uuid = search.user_uuid
        //search.email = search.email
        search.password = password
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

function deleteUser(user) {
    user_uuid = user.user_uuid
    email = user.email
    password = user.password
    let search = getUser({user_uuid: user_uuid, email: email, password: password});
    if (search==null) {
        return {error: "user does not exist"};
    }
    users.findAndRemove({user_uuid: user_uuid, email: email, password});
    db.saveDatabase();
    return {status: "successful"};
}

function getUser(params) {
    return users.findOne(params);
}

function searchUsers(q) {
    return users.find(q)
    return users.where(function(obj) {
        if (obj.offerDetails.includes(q) || obj.productDetails.includes(q)) {
            return true;
        }
        return false;
    });
}


function createCart(cart) {
    cart_uuid = cart.cart_uuid
    items = cart.items
    
    if (!cart_uuid)
        return {error: "cart_uuid null"}

    let search = getCart({cart_uuid: cart_uuid});

    if (search==null) {
        //cart_uuid = uuidv4();

        carts.insert({
            cart_uuid: cart_uuid,
            items: items
        })

        db.saveDatabase()
        
        return {cart_uuid: cart_uuid}
    } else {
        return {error: "cart already exists"}
    }
}

function setCart(cart) {
    cart_uuid = cart.cart_uuid
    items = cart.items

    let search = getCart({cart_uuid: cart_uuid});


    if (search==null) {
        return createCart(cart)
        //return {error: "cart does not exist"};
    } else {
        search.items = items
        carts.update(search);
        db.saveDatabase();
        return search;
    }
}

function deleteCart(cart) {
    cart_uuid = cart.cart_uuid
    items = cart.items

    let search = getCart({cart_uuid: cart_uuid});
    if (search==null) {
        return {error: "cart does not exist"};
    }
    carts.findAndRemove({cart_uuid: cart_uuid});
    db.saveDatabase();
    return {status: "successful"};
}

function getCart(params) {
    console.log(params)
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
    item_uuid = uuidv4() //item.item_uuid
    name = item.name
    description = item.description
    imageURL = item.imageURL
    productURL = item.productURL
    price = item.price
    type = item.type
    type_name = item.type_name

    if (!item_uuid)
        return {error: "item_uuid null"}

    let search = getItem({item_uuid: item_uuid});

    if (search==null) {
        //item_uuid = uuidv4();

        items.insert({
            item_uuid: item_uuid,
            name: name,
            description: description,
            imageURL: imageURL,
            productURL: productURL,
            price: price,
            type: type,
            type_name: type_name
        })

        db.saveDatabase()
        
        return {item_uuid: item_uuid}
    } else {
        return {error: "item already exists"}
    }
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

function getItem(params) {
    return items.findOne(params);
}

function searchItems(q) {
    //console.log(items)
    res = items.find(q)
    //console.log(res)
    //console.log(items)
    return res

    /*
    return items.where(function(obj) {
        if (obj.offerDetails.includes(q) || obj.productDetails.includes(q)) {
            return true;
        }
        return false;
    });
    */
}



function createType(type) {
    type_uuid = uuidv4() //type.type_uuid
    name = type.name
    
    if (!type_uuid)
        return {error: "type_uuid null"}

    let search = getType({type_uuid: type_uuid});

    if (search==null) {
        //type_uuid = uuidv4();

        types.insert({
            type_uuid: type_uuid,
            name: name
        })

        db.saveDatabase()
        
        return {type_uuid: type_uuid}
    } else {
        return {error: "type already exists"}
    }
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

function getType(params) {
    console.log("getType ")
    console.log( params)
    return types.findOne(params);
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
function populateDB() {
    //"", "", "", "", "", ""
    let dummy_data = [
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
    types_dummy = ["CPU", "GPU", "Motherboard", "HDD", "SSD", "RAM"]
    
        //setArea(ar);
        for (j in dummy_data) {
            var type_dummy = getType({name: dummy_data[j].type})
            //var type_dummy = null
            
            console.log("Res : ")
            console.log(type_dummy)
            var type_dummy_id = ""
            if ( type_dummy == null )
                type_dummy_id = createType({
                    name: dummy_data[j].type
                })
            else
                type_dummy_id = type_dummy.type_uuid
            //setStore(ar, st, t1[randInt(0,3)] + " " + t2[randInt(0,3)] + " " + t3[randInt(0,3)]);
            for (var k=0; k<dummy_data[j].data.length; k++) {
                for (var i=0; i<10; i++)
                    createItem({
                        //item_uuid: item_uuid,
                        name: dummy_data[j].data[k].name,
                        description: dummy_data[j].data[k].description,
                        imageURL: dummy_data[j].data[k].imageURL,
                        productURL: dummy_data[j].data[k].productURL,
                        price: dummy_data[j].data[k].price,
                        type: type_dummy_id,
                        type_name: dummy_data[j].type
                    });
            }
        }  
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
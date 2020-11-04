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
            type: type
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
    console.log(params)
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
    let t1 = [
        "Reliance",
        "Tata",
        "Harsha",
        "Babaji"
    ], t2 = [
        "Grocery",
        "Gifts",
        "Electronics",
        "Digital"
    ], t3 = [
        "Stall",
        "Store",
        "Shop",
        "Center"
    ], offerText = [//
        {
            url: ["https://5.imimg.com/data5/GV/DP/MY-3831378/500ml-plastic-water-bottle-500x500.jpg", "https://images-na.ssl-images-amazon.com/images/I/51EpktZ6FLL._SX425_.jpg", "https://5.imimg.com/data5/TD/JK/MY-7507778/plastic-water-jar-500x500.jpg", "https://images.prod.meredith.com/product/f62f8a8e393cc53df45b4a381730affd/1550826915323/l/sorbet-18-oz-summit-insulated-water-bottle"],
            prod: "Water Bottle",
        }, {
            url: ["https://images-na.ssl-images-amazon.com/images/I/71nQ4AO0HEL._SY355_.jpg", "https://media.wired.com/photos/59e95567ce22fd0cca3c5262/master/pass/1M9A0509_V3.jpg", "https://www.amkette.com/wp-content/uploads/2017/11/1-1.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRst6yycXz3KAEEWaEIgKimj4VMBbYMbt2snY-TU4i4HL_JkmWs", "https://www.sony.co.in/image/b4698bb5d24076a3cd8d09e5dbb64834?fmt=pjpeg&wid=660&hei=660&bgcolor=F1F5F9&bgc=F1F5F9"],
            prod: "Earphones"
        }, {
            url: ["https://cms.cloudinary.vpsvc.com//image/fetch/t_sitecore_images/f_auto,dpr_auto,w_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2Fen-AU%2F%7BA2567039-297C-445F-8007-371806181746%7D", "https://www.graphicimage.com/v/vspfiles/photos/PEN%20Full%20Wrap%20CRO-2.jpg", "https://www.dhresource.com/0x0s/f2-albu-g6-M00-57-07-rBVaSFshfZWAbYpEAANtPFn_AvQ678.jpg/luxury-fine-fountain-pen-0-5-mm-nib-ink-pens.jpg", "https://ae01.alicdn.com/kf/HTB1ugKSbaigSKJjSsppq6ybnpXa1/Best-Price-High-Quality-Original-Hero-1072-Fountain-Pen-Medium-Nib-0-5mm-Ink-Pens-Fashion.jpg_640x640.jpg"],
            prod: "Pens"
        }, {
            url: ["https://target.scene7.com/is/image/Target/GUEST_65f6c2bb-714f-4328-9aca-07536c8961d7?wid=488&hei=488&fmt=pjpeg", "https://images-na.ssl-images-amazon.com/images/I/81wSa-vDWfL._SL1500_.jpg", "https://i5.walmartimages.com/asr/eb74754f-d053-46b6-9f94-8f78cb648fa3_1.48cb6d913d610799e169f42beca64ff2.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF"],
            prod: "Cereal"
        }, {
            url: ["http://assets.myntassets.com/assets/images/9037183/2019/3/28/e3e1e844-416e-45ee-a005-23a992f248461553771977458-Fossil-Grant-Blue-Watch-FS5061-1541553771976305-1.jpg", "https://images-na.ssl-images-amazon.com/images/I/71QHGTKiwAL._UX342_.jpg", "https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg", "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/2181833/2017/10/31/11509426591168-Fossil-Men-Smart-Watches-8451509426591053-1.jpg", "https://cdn.shopify.com/s/files/1/0238/6181/products/Weiss_Watch_Company_Automatic_Issue_Field_Watch_White_Dial_2048x2048.jpg"],
            prod: "Watch"
        }, {
            url: ["https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1543951101-clubmonaco-1543951095.jpg", "https://huckberry.imgix.net/spree/products/401386/original/ItPVa58KrN_finisterre_tein_sweater_0_original.jpg?auto=compress%2Cformat&dpr=1&cs=tinysrgb&crop=top&fit=clip&w=600&h=600", "https://cdn3.volusion.com/csubk.ndmav/v/vspfiles/photos/1025-2.jpg?1484555937", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUnKWtlUeefVJ50loPeN9FJyWJay4bJ1qbasJMVS3ZBYdBYIW4"],
            prod: "Sweater"
        }, {
            url: ["https://images-na.ssl-images-amazon.com/images/I/41Cx1ddB0dL._SX425_.jpg", "https://rukminim1.flixcart.com/image/704/704/jlfh6kw0/cycle/y/9/8/stomper-sstp16bl0001-10-hero-original-imaf8katydeb4upn.jpeg?q=70", "https://5.imimg.com/data5/HH/WN/MY-26779310/bmw-folding-cycle-500x500.jpg", "https://www.kyadu.com/wp-content/uploads/2019/05/jaguar-frame-ontrack-fat-tyre-bike-cycle-bicycle-red.jpg"],
            prod: "Cycle"
        }, {
            url: ["https://images-na.ssl-images-amazon.com/images/I/51YLlAcgFGL.jpg", "https://slimages.macysassets.com/is/image/MCY/products/7/optimized/9029737_fpx.tif?op_sharpen=1&wid=500&hei=613&fit=fit,1&$filtersm$", "https://dks.scene7.com/is/image/GolfGalaxy/15WLRUCKWLF12XXXXGFT?wid=500&fmt=jpg", "https://i5.walmartimages.com/dfw/4ff9c6c9-f6a9/k2-_c29c8e1b-66ca-4268-8955-aef5c5ae9875.v1.jpg?odnWidth=282&odnHeight=282&odnBg=ffffff"],
            prod: "Stuffed Toys"
        }, {
            url: ["https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c05962484.png", "https://www.lenovo.com/medias/lenovo-laptop-thinkpad-e485-hero.png?context=bWFzdGVyfHJvb3R8NjQ5MDF8aW1hZ2UvcG5nfGhmYy9oYmEvOTY1MzY4MjUzNjQ3OC5wbmd8ZDUyZDQyOWQ3YmZhMjZkNDg1ODAxNmQzYzZjNjNmNmM1MWNhMzQ0NThlMmI5ZmRlMGRjNTE0ZDgxNTkwZWRjMw", "https://brain-images-ssl.cdn.dixons.com/8/5/10180958/u_10180958.jpg", "https://media.wired.com/photos/5bedfc9d18d429059f2f104b/master/pass/surfacelaptop2.jpg"],
            prod: "Laptop"
        }, {
            url: ["https://www.androidcentral.com/sites/androidcentral.com/files/styles/w1600h900crop_wm_brw/public/article_images/2018/08/samsung-galaxy-tab-s4-7_0.jpg?itok=1BtajAUv", "https://boygeniusreport.files.wordpress.com/2019/02/amazon-fire-hd-10-tablet.jpg?quality=98&strip=all&w=782", "https://images.samsung.com/is/image/samsung/p5/uk/home/PC_PCD_primary_section_Galaxy_Tab_S4.PNG?$ORIGIN_PNG$", "https://thumbs.nosto.com/quick/magento-656ad115/8/126092/86d45601a56b1b43b0f48c16341d8ec844612227808c5fb9825906f8024c382fa/A"],
            prod: "Tablets"
        }
    ], ofr = [
        "Buy One get One free",
        "Buy Two get One free",
        "Buy Two get Two free",
        "Buy Three get One free",
        "65% Off",
        "50% Off",
        "25% Off",
        "10% Off",
        "Exchnage Offer",
        "Student Discount : 20%",
        "Student Discount : 40%",
        "Student Discount : 15%"
    ];
    types_dummy = ["CPU", "GPU", "Motherboard", "HDD", "SSD", "RAM"]
    
        //setArea(ar);
        for (var j=0; j<types_dummy.length; j++) {
            let type_dummy_id = createType({
                name: types_dummy[j]
            })
            //setStore(ar, st, t1[randInt(0,3)] + " " + t2[randInt(0,3)] + " " + t3[randInt(0,3)]);
            for (var k=0; k<6; k++) {
                let f = generateID();
                let tmp = randEle(offerText);
                let d1 = new Date(Date.now() - randInt(1000000000,9000000000));
                let d2 = new Date(Date.now() + randInt(1000000000,9000000000));
                //setOffer(ar, st, f, randEle(tmp.url), tmp.prod, randEle(ofr), d1.getTime(), d2.getTime());
                setItem({
                    //item_uuid: item_uuid,
                    name: tmp.prod ,
                    description: randEle(ofr),
                    imageURL: tmp.url,
                    productURL: tmp.url,
                    price: randInt(10000,50000),
                    type: type_dummy_id
                })
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
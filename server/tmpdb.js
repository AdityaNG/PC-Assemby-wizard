//import { fromString } from 'uuidv4';
const { fromString } = require('uuidv4');

console.log(fromString(JSON.stringify({obk: 'somwe'})))
/*
console.log(typeof('sad') == 'string')
console.log(String)

const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    password: '12345678',
    database: 'pc_assembly',
})

client.connect()

client.query("SELECT * FROM users ;", (err, res) => {
    console.log(res.rows)
    client.end()
})
*/
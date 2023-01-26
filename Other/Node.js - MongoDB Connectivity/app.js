const {MongoClient} = require('mongodb');  // modern js syntax
// const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function getData() {
    let result = await client.connect();
    let db = result.db('e-comm')  // name of the database
    let collection = db.collection('products');  // name of the collection
    let response = await collection.find({}).toArray()
    console.log(response);
}

getData();
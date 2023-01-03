const {MongoClient} = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function getData() {
    let result = await client.connect();
    let db = result.db('temp')  // name of the database
    let collection = db.collection('Teacher_info');
    let response = await collection.find({}).toArray()
    console.log(response);
}

getData();
const mongodb = require('mongodb');
// const mongoose = require('mongoose');
const MongoClient = mongodb.MongoClient;

const dbUrl = "mongodb+srv://adityapadwal:aditya3102@cluster0.sq1hr4c.mongodb.net/shop?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let _db;

// This is for connecting and then storing the connection to the database
const mongoConnect = (callback) => {
  MongoClient.connect(dbUrl, connectionParams)
  .then((client) => {
    _db = client.db();
    callback();
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
} 

// this is for returning access to the database connection if it exists
const getDb = () => {
  if (_db) 
  {
    return _db;
  }
  throw 'No Database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;



const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  mongoClient.connect(
    "mongodb+srv://adityapadwal:aditya3102@cluster0.sfjvdxb.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((client) => {
    console.log('Connected Successfully!');
    _db = client.db();
    callback();
  })
  .catch((err) => {
    console.log(err);
    throw(err);
  });
};

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient;

require('dotenv').config()

let _db;
const mongoConnect = async (req,res)=>{
  try {
    const client =await mongoClient.connect(`mongodb+srv://${process.env.mongoDb_name}:${process.env.mongoDb_pass}@cluster0.morce5g.mongodb.net/`)
    console.log('Connnection Established mongDB')
    _db = client.db('test')
    return client
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error
  }
}

const getDb = ()=>{
  if(_db){
    return _db
  }else{
    throw 'No databse found'
  }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb
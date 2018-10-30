const MongoDB = require('mongodb'),
  config = require('../config/default'),
  MongoClient = MongoDB.MongoClient,
  objectID = MongoDB.ObjectID;

class MyMongoDB {
  static getInstance() {
    if (!MyMongoDB.instance) { //单例，解决多次实例化不共享的问题
      MyMongoDB.instance = new MyMongoDB();
    }
    return MyMongoDB.instance;
  }
  constructor() {
    this.dbClient = null;
    this.connect();
  }
  //连接数据库
  connect() {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) { //解决数据库多次连接的问题
        MongoClient.connect(config.mongodb.dbUrl, { useNewUrlParser: true }, (err, client) => {
          if (err) throw err;
          let db = client.db(config.mongodb.dbName);
          this.dbClient = db;
          resolve(db);
        })
      } else {
        resolve(this.dbClient);
      }
    })
  }
  //查找方法
  find(collectionName, query) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        let result = db.collection(collectionName).find(query);
        result.toArray((err, docs) => {
          if (err) throw err;
          resolve(docs)
        })
      })
    })
  }
   //限制数量的查询
   findCount(collectionName, query,up,num) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        let result = db.collection(collectionName).find(query).skip(up-1).limit(num);
        result.toArray((err, docs) => {
          if (err) throw err;
          resolve(docs)
        })
      })
    })
  }
  //插入方法
  insert(collectionName, data=null) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).insertOne(data, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        })
      })
    })
  }
  //更新方法
  update(collectionName,query,data) {
    return new Promise((resolve,reject)=>{
      this.connect().then(db=>{
        db.collection(collectionName).updateOne(query,{$set:data},(err,data)=>{
          if(err){
            reject(err);
          } else {
            resolve(data);
          }
        })
      })
    })
  }
  //删除方法
  delete(collectionName,query){
    return new Promise((resolve,reject)=>{
      this.connect().then(db=>{
        db.collection(collectionName).deleteOne(query,(err,data)=>{
          if(err){
            reject(err);
          } else {
            resolve(data);
          }
        })
      })
    })
  }
  getObjectID(id){ //字符串查询时转换
    return new objectID(id);
  }
}

module.exports = MyMongoDB.getInstance();


module.exports = {
  port:8000,
  session: {
    secret: 'blog',
    key:'blog',
    maxAge:2592000000
  },
  mongodb:{
    dbUrl:'mongodb://localhost:27017',
    dbName:'Koa'
  }
}

module.exports = {
  // database: process.env.database || 'mongodb://localhost:27017/user_module',
  database: process.env.database || 'mongodb+srv://arkajit:arkajit@blogdev-dl77q.mongodb.net/user?retryWrites=true&w=majority', //testing
  secretKey: 'secret',
  refreshTokenSecret : 'secret',
  tokenLife: 900,
  refreshTokenLife: 86400
}

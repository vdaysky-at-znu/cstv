const parentPath = require('path').resolve(__dirname, '../../../')
require('dotenv').config({ path: parentPath + "/.env.local" });

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "logging":true
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "cstv",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "cstv",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

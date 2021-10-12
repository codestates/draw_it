require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'drawit_dev',
    host: 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD ||'',
    database: process.env.DATABASE_NAME || 'drawit_test',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '', 
    database: process.env.DATABASE_NAME || 'drawit_prod',
    host: 'localhost',
    dialect: 'mysql',
  },
};

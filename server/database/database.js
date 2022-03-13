const Sequelize = require("sequelize");
require("dotenv").config();

let instance = null;
switch (process.env.NODE_ENV) {
  case "production":
    instance = new Sequelize(
      "heroku_0beac5ae13c3a7c",
      "b30994893ce22f",
      "e0dc9c73",
      {
        host: "us-cdbr-east-03.cleardb.com",
        dialect: "mysql",
        logging: false,
        port: 3306,
        retry: {
          match: [
            /ETIMEDOUT/,
            /EHOSTUNREACH/,
            /ECONNRESET/,
            /ECONNREFUSED/,
            /ETIMEDOUT/,
            /ESOCKETTIMEDOUT/,
            /EHOSTUNREACH/,
            /EPIPE/,
            /EAI_AGAIN/,
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/,
          ],
          max: 5,
        },
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );
    break;

  case "development":
    instance = new Sequelize("parkdb", "root", "", {
      host: "localhost",
      dialect: "mysql",
      logging: false,
      retry: {
        match: [
          /ETIMEDOUT/,
          /EHOSTUNREACH/,
          /ECONNRESET/,
          /ECONNREFUSED/,
          /ETIMEDOUT/,
          /ESOCKETTIMEDOUT/,
          /EHOSTUNREACH/,
          /EPIPE/,
          /EAI_AGAIN/,
          /SequelizeConnectionError/,
          /SequelizeConnectionRefusedError/,
          /SequelizeHostNotFoundError/,
          /SequelizeHostNotReachableError/,
          /SequelizeInvalidConnectionError/,
          /SequelizeConnectionTimedOutError/,
        ],
        max: 5,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
    break;

  default:
    instance = new Sequelize("wmsu_cpe", "root", "", {
      host: "localhost",
      dialect: "mysql",
      logging: false,
      retry: {
        match: [
          /ETIMEDOUT/,
          /EHOSTUNREACH/,
          /ECONNRESET/,
          /ECONNREFUSED/,
          /ETIMEDOUT/,
          /ESOCKETTIMEDOUT/,
          /EHOSTUNREACH/,
          /EPIPE/,
          /EAI_AGAIN/,
          /SequelizeConnectionError/,
          /SequelizeConnectionRefusedError/,
          /SequelizeHostNotFoundError/,
          /SequelizeHostNotReachableError/,
          /SequelizeInvalidConnectionError/,
          /SequelizeConnectionTimedOutError/,
        ],
        max: 5,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
}

module.exports = instance;
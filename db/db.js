const knex = require('knex');

const knexConf = require('../knexfile').development;

const db = knex(knexConf);

db.raw('PRAGMA foreign_keys = ON');

module.exports = db;

const knex = require('knex');

const knexConf = require('../knexfile').development;

const db = knex(knexConf);

module.exports = db;

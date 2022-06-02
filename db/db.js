const knex = require('knex');

const knexConf = require('../knexfile').development;

const db = knex(knexConf);

const { attachPaginate } = require('knex-paginate');
attachPaginate();

db.raw('PRAGMA foreign_keys = ON');

module.exports = db;

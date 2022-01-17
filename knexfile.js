module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      database: 'adv',
      user:     'root',
      password: 'secret'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
/*
  development: {
    client: 'sqlite3',
    connection: {
      filename: "mydb.sqlite"
    },
    useNullAsDefault: true,
  },*/
/*
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
*/
};

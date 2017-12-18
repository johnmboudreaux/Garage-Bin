module.exports = {

  development: {
    client: 'pg',
    connection: 'postgress://localhost/garage_things',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }
};

const { Pool } = require('pg');
const config = require('./index');

const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  max: config.db.max,
  idleTimeoutMillis: config.db.idleTimeoutMillis,
  connectionTimeoutMillis: config.db.connectionTimeoutMillis
});

pool.on('connect', () => console.log('Connected to PostgreSQL'));
pool.on('error', (err) => {
  console.error(`PostgreSQL Connection Error => ${err}`);
  process.exit(-1);
});

module.exports = pool;
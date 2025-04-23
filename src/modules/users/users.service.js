const db = require('../../config/db');

async function saveUsersToDB(users, createdBy = 'system') {
  const client = await db.connect();
  const insertQuery = `
    INSERT INTO users(name, age, address, additional_info, created_by, created_at)
    VALUES %L
  `;

  const format = require('pg-format');
  const values = users.map(user => [
    user.name,
    user.age,
    user.address,
    user.additional_info,
    createdBy,
    new Date()
  ]);

  try {
    await client.query('BEGIN');
    const query = format(insertQuery, values);
    await client.query(query);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw new Error(error.message);
  } finally {
    client.release();
  }
}

async function getAgeDistribution() {
  const query = `
    SELECT
      SUM(CASE WHEN age < 20 THEN 1 ELSE 0 END)::float / COUNT(*) * 100 AS below_20,
      SUM(CASE WHEN age BETWEEN 20 AND 40 THEN 1 ELSE 0 END)::float / COUNT(*) * 100 AS _20_40,
      SUM(CASE WHEN age BETWEEN 40 AND 60 THEN 1 ELSE 0 END)::float / COUNT(*) * 100 AS _40_60,
      SUM(CASE WHEN age > 60 THEN 1 ELSE 0 END)::float / COUNT(*) * 100 AS above_60
    FROM users
  `;
  const result = await db.query(query);
  return result.rows[0];
}

module.exports = { saveUsersToDB, getAgeDistribution };
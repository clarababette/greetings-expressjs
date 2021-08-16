import assert from 'assert';
import greetings from '../public/greet.js';
import pg from 'pg';
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/greetings_test';

const pool = new Pool({
  connectionString,
});

const greet = greetings(pool);

describe('The greetings app', () => {
  beforeEach(async function() {
    await pool.query('delete from users;');
  });

  it('should add new users to the database', async function() {
    await greet.addUser('Martin');
    const users = await greet.getAll();
    assert.strictEqual(['Martin'], users);
  });

  after(function() {
    pool.end();
  });
});

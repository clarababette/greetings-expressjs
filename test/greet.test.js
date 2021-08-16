const assert = require('assert');
import greetings from './public/greet.js';
const pg = require('pg');
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

  // it('should retain the count after refreshing', () => {

  // });
  // it('should be able to reset the count', () => {

  // });
  // it('should be able to greet someone in English', () => {

  // });
  // it('should be able to greet someone in Kiswahili', () => {

  // });
  // it('should be able to greet someone in Hungarian', () => {

  // });
  // it('should greet someone in the language of their choosing', () => {

  // });

  // it('should be able to count each person greeted only once', () => {

  // });
  after(function() {
    pool.end();
  });
});

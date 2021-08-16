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
    let users = await greet.getAll();
    assert.deepStrictEqual(['Martin'], users);
    await greet.addUser('Arthur');
    await greet.addUser('Doughlas');
    users = await greet.getAll();
    assert.deepStrictEqual(['Martin', 'Arthur', 'Doughlas'], users);
  });
  it('should record the number of times a users has been greeted in a language',
      async function() {
        const all = await greet.getAll;
        console.log(all);
        await greet.updateEngCount('Martin');
        await greet.updateEngCount('Martin');
        await greet.updateSwaCount('Martin');
        await greet.updateSwaCount('Arthur');
        await greet.updateHungCount('Martin');
        await greet.updateHungCount('Martin');
        await greet.updateHungCount('Martin');

        let userCount = await greet.getUser('Martin');
        const martin = {
          username: 'Martin', english: 2, swahili: 1, hungarian: 3,
        };
        assert.deepStrictEqual(martin, userCount);

        userCount = await greet.getUser('Arthur');
        assert.deepStrictEqual(
            {username: 'Arthur', english: 0, swahili: 1, hungarian: 0},
            userCount);
      });

  it('should add new users to the database', async function() {
    await greet.addUser('Martin');
    const users = await greet.getAll();
    assert.deepStrictEqual(['Martin'], users);
  });
  it('should add new users to the database', async function() {
    await greet.addUser('Martin');
    const users = await greet.getAll();
    assert.deepStrictEqual(['Martin'], users);
  });
  it('should add new users to the database', async function() {
    await greet.addUser('Martin');
    const users = await greet.getAll();
    assert.deepStrictEqual(['Martin'], users);
  });


  after(function() {
    pool.end();
  });
});

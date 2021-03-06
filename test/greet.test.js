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
        await greet.addUser('Martin');
        await greet.addUser('Arthur');
        await greet.updateEngCount('Martin');
        await greet.updateEngCount('Martin');
        await greet.updateSwaCount('Martin');
        await greet.updateSwaCount('Arthur');
        await greet.updateHungCount('Martin');
        await greet.updateHungCount('Martin');
        await greet.updateHungCount('Martin');

        let userCount = await greet.getUser('Martin');
        assert.deepStrictEqual(userCount,
            {username: 'Martin', english: 2, swahili: 1, hungarian: 3});

        userCount = await greet.getUser('Arthur');
        assert.deepStrictEqual(
            {username: 'Arthur', english: 0, swahili: 1, hungarian: 0},
            userCount);
      });

  it('should be able to delete all users', async function() {
    await greet.addUser('Martin');
    let users = await greet.getAll();
    assert.deepStrictEqual(['Martin'], users);
    await greet.addUser('Arthur');
    await greet.addUser('Doughlas');
    users = await greet.getAll();
    assert.deepStrictEqual(['Martin', 'Arthur', 'Doughlas'], users);
    await greet.deleteAll();
    users = await greet.getAll();
    assert.deepStrictEqual([], users);
  });

  it('should greeting someone in the language of their choosing',
      async () => {
        let greeting = await greet.getGreeting('english', 'Doughlas');
        assert.strictEqual(greeting, 'Hello, Doughlas');
        greeting = await greet.getGreeting('swahili', 'Doughlas');
        assert.strictEqual(greeting, 'Jambo, Doughlas');
        greeting = await greet.getGreeting('hungarian', 'Doughlas');
        assert.strictEqual(greeting, 'Szia, Doughlas');
      });


  after(function() {
    pool.end();
  });
});

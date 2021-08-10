/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// import pg from 'pg';
// const Pool = pg.Pool;
// const pool = new Pool({
//   user: 'coder',
//   password: 'pg123',
//   database: 'greetings_database',
//   host: 'localhost',
//   port: 5432,
// });

import pg from 'pg';
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const connectionString =
  process.env.DATABASE_URL || 'postgresql://localhost:5432/greetings_database';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
export default function GreetEveryone() {
  let message = '';

  async function getAll() {
    return await pool.query('SELECT * FROM users');
  }

  async function addUser(name) {
    await pool.query(
      `INSERT INTO users (username,english,hungarian,swahili) VALUES ($1,0,0,0) ON 
          CONFLICT (username) DO NOTHING;`,
      [name]
    );
  }

  async function updateSwaCount(name) {
    const userData = await pool.query(
      `UPDATE users SET swahili = swahili+1 WHERE users.username = $1 RETURNING *`,
      [name]
    );
    return userData.rows[0];
  }

  async function updateEngCount(name) {
    const userData = await pool.query(
      'UPDATE users SET english = english+1 WHERE users.username = $1 RETURNING *',
      [name]
    );
    return userData.rows[0];
  }
  async function updateHungCount(name) {
    const userData = await pool.query(
      'UPDATE users SET hungarian = hungarian+1 WHERE users.username = $1 RETURNING *',
      [name]
    );
    return userData.rows[0];
  }

  function startMsg(count) {
    switch (count) {
      case 0:
        return 'Go ahead; enter your name to be the first one greeted!';

      case 1:
        return 'Join the one other person to have been greeted.';

      default:
        return `Join the ${count} other people that have already been greeted!`;
    }
  }

  async function indexRoute(req, res) {
    const all = await getAll();
    if (message == '') {
      req.flash('info', startMsg(all.rowCount));
    }
    message = '';
    res.render('index');
  }

  function formatName(name) {
    const formattedName = name.trim().toLowerCase();

    return formattedName[0].toUpperCase() + formattedName.slice(1);
  }

  async function getGreeting(lang, name) {
    let userData = '';
    switch (lang) {
      case 'english':
        userData = await updateEngCount(name);
        userData.greeting = `Hello, ${name}`;
        break;

      case 'swahili':
        userData = await updateSwaCount(name);
        userData.greeting = `Jambo, ${name}`;
        break;

      case 'hungarian':
        userData = await updateHungCount(name);
        userData.greeting = `Szia, ${name}`;
        break;

      default:
        break;
    }
    return userData;
  }

  async function greetRoute(req, res) {
    // console.log(req.locals.messages);
    let name = req.body.username;
    const lang = req.body.languageRadio;
    try {
      if (!name) throw new Error('Please enter your name.');

      name = formatName(name);
      const notLetter = /[^A-z]/g;
      if (notLetter.test(name)) {
        throw new Error('Enter a name that only contains letters.');
      }
      if (!lang) throw new Error('Please select a language.');
      await addUser(name);
      const userData = await getGreeting(lang, name);
      const allUsers = await getAll();
      const userTotal =
        userData.english + userData.swahili + userData.hungarian;

      if (userTotal == 1) {
        if (allUsers.rowCount == 1) {
          userData.message =
            'Congrats! You are the first person to be greeted.';
        } else {
          userData.message = `You are now part of the ${allUsers.rowCount} people that have been greeted.`;
        }
      } else {
        userData.message = 'Welcome back!';
      }
      message = userData.message;
      req.flash('greeting', userData.greeting);
      req.flash('info', message);
    } catch (err) {
      req.flash('error', err.message);
    }
    res.redirect('/');
  }

  async function resetRoute(req, res) {
    await pool.query('DELETE FROM users');
    res.redirect('/');
  }

  async function greetedRoute(req, res) {
    const all = await getAll();
    const users = all.rows;
    users.forEach((row) => {
      row.userRoute = `/counter/${row.username}`;
    });
    console.log(users);
    res.render('visitors', {userList: users});
  }

  function langInfo(name, num, lang) {
    switch (num) {
      case 0:
        return 'We have not yet greeted ' + name + ' in ' + lang + '.';
      case 1:
        return 'We have greeted ' + name + ' once in ' + lang + '.';
      case 2:
        return 'We have greeted ' + name + ' twice in ' + lang + '.';
      default:
        return (
          'We have greeted ' + name + ' in ' + lang + ' ' + num + ' times.'
        );
    }
  }

  async function userRoute(req, res) {
    const thisUser = await pool.query(
      'SELECT * FROM users WHERE users.username = $1',
      req.params.user
    );
    res.render('user', {
      english: langInfo(thisUser.username, thisUser.english, 'English'),
      swahili: langInfo(thisUser, thisUser.swahili, 'Swahili'),
      hungarian: langInfo(thisUser, thisUser.hungarian, 'Hungarian'),
    });
  }
  return {
    indexRoute,
    greetRoute,
    resetRoute,
    greetedRoute,
    userRoute,
  };
}

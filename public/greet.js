/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

export default function greetings(pool) {
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

  function formatName(name) {
    const formattedName = name.trim().toLowerCase();

    return formattedName[0].toUpperCase() + formattedName.slice(1);
  }

  async function getGreeting(lang, name) {
    let greeting = '';
    switch (lang) {
      case 'english':
        await updateEngCount(name);
        greeting = `Hello, ${name}`;

      case 'swahili':
        await updateSwaCount(name);
        greeting = `Jambo, ${name}`;

      case 'hungarian':
        await updateHungCount(name);
        greeting = `Szia, ${name}`;

      default:
        break;
    }
    return greeting;
  }

  function langCount(name, num, lang) {
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

  async function langInfo(username) {
    const thisUser = await getUser(username);
    const info = {
      english: langCount(username, thisUser.english, 'English'),
      swahili: langCount(username, thisUser.swahili, 'Swahili'),
      hungarian: langCount(username, thisUser.hungarian, 'Hugarian'),
    };
    return info;
  }

  function returnMsg(newUser, total) {
    if (newUser && total == 1) {
      return 'Congrats! You are the first person to be greeted.';
    } else if (newUser && total > 1) {
      return `You are now part of the ${total} people that have been greeted.`;
    }
    return 'Welcome back!';
  }

  function validateInputs(name, language) {
    if (!name) {
      return 'Please enter your name.';
    }
    if (!language) {
      return 'Please select a language.';
    }
    const notLetter = /[^A-z]/g;
    if (notLetter.test(name)) {
      return 'Enter a name that only contains letters.';
    }
  }

  // Database Queries
  async function getAll() {
    const users = await pool.query('SELECT username FROM users');
    return users.rows.map((user) => {
      return user.username;
    });
  }

  async function addUser(name) {
    await pool.query(
        `INSERT INTO users (username,english,hungarian,swahili) VALUES ($1,0,0,0) ON 
          CONFLICT (username) DO NOTHING;`,
        [name],
    );
  }

  async function updateSwaCount(name) {
    const userData = await pool.query(
        `UPDATE users SET swahili = swahili+1 WHERE users.username = $1 RETURNING *`,
        [name],
    );
    return userData.rows[0];
  }

  async function updateEngCount(name) {
    const userData = await pool.query(
        'UPDATE users SET english = english+1 WHERE users.username = $1 RETURNING *',
        [name],
    );
    return userData.rows[0];
  }
  async function updateHungCount(name) {
    const userData = await pool.query(
        'UPDATE users SET hungarian = hungarian+1 WHERE users.username = $1 RETURNING *',
        [name],
    );
    return userData.rows[0];
  }

  async function getUser(username) {
    const user = await pool.query(
        'SELECT * FROM users WHERE users.username = $1',
        [username],
    );
    return user.rows[0];
  }

  async function deleteAll() {
    await pool.query('DELETE FROM users');
  }

  // Routes
  async function indexRoute(req, res) {
    const all = await getAll();
    console.log(all);
    let message = '';
    if (req.session.views) {
      message = returnMsg(req.session.newUser, all.length);
    } else {
      message = startMsg(all.length);
    }
    delete req.session.newUser;
    res.render('index', {info: message});
  }


  async function greetRoute(req, res) {
    let name = req.body.username;
    if (name) {
      name = formatName(name);
    }
    const lang = req.body.languageRadio;
    const error = validateInputs(name, lang);
    if (error) {
      req.flash('error', error);
    } else {
      const all = await getAll();
      req.session.views = 1;
      if (!all.includes(name)) {
        await addUser(name);
        req.session.newUser = true;
        req.flash('greeting', getGreeting(lang, name));
      } else {
        req.flash('greeting', getGreeting(lang, name));
      }
    }
    res.redirect('/');
  }
  async function resetRoute(req, res) {
    await deleteAll();
    res.redirect('/');
  }
  async function greetedRoute(req, res) {
    const usernames = await getAll();
    res.render('visitors', {userList: usernames.map((name) => {
      return {username: name, userRoute: `/counter/${name}`};
    })});
  }
  async function userRoute(req, res) {
    const thisUser = await langInfo(req.params.user);
    res.render('user', {
      english: thisUser.english,
      swahili: thisUser.swahili,
      hungarian: thisUser.hungarian,
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

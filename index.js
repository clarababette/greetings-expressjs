'use strict';
import express from 'express';
import exphbs from 'express-handlebars';
import GreetEveryone from './public/greet.js';
import flash from 'express-flash';
import session from 'express-session';
const app = express();
const greetMe = new GreetEveryone();
import pg from 'pg';
const Client = pg.Client;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query(
  'SELECT table_schema,table_name FROM information_schema.tables;',
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  }
);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'));
app.use(
  session({
    secret: 'reincarnated as a wild horse on the far off planet called Nearly.',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get('/', greetMe.indexRoute);

app.post('/greet', greetMe.greetRoute);

app.get('/greeted', greetMe.greetedRoute);

app.post('/reset', greetMe.resetRoute);

app.get('/counter/:user', greetMe.userRoute);

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
  console.log(`App starting on port ${PORT}`);
});

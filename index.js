'use strict';
import express from 'express';
import exphbs from 'express-handlebars';
import GreetEveryone from './public/greet.js';
import flash from 'express-flash';
import session from 'express-session';
const app = express();
const greetMe = new GreetEveryone();
import pg from 'pg';
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const connectionString =
  process.env.DATABASE_URL || 'postgresql://localhost:5432/my_products';

const pool = new Pool({
  connectionString,
  ssl: useSSL,
});

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

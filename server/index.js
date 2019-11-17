const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const models = require('./models');
const keys = require('./config/keys');
const cors = require('cors');
const app = express(); // Generate new application

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: keys.cookieSecret,
  saveUninitialized: true,
  resave: true,
  maxAge: 24 * 60 * 60 * 1000, // 1 day  
}));

require('./routes/account')(app);
require('./routes/transaction')(app);
require('./routes/transfer')(app);

const PORT = process.env.PORT || 5000;

models.sequelize.sync()
  .then(result => {
    //  console.log(result.models);
    app.listen(PORT, () => {
      console.log('Server listening on port ' + PORT);
    });
  })
  .catch(err => {
    console.log('[Sequelize initializing failed]\n', err);
  });

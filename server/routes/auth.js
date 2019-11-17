const addUser = require('./../controllers/user').addUser;

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.send({message: 'Welcome'});
  })

  app.post('/sign-up', addUser);

  app.post('/sign-in', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
  });

  app.get('/api/current-user', (req, res) => {
    res.send(req.user);
  });
}
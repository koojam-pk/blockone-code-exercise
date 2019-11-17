const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models').User;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id, { attributes: ['id', 'firstName', 'lastName']})
    .then(user => {
      done(null, user);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
  
  User.findOne({where: { userName: username }})
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      } else {          
        if (user.validPassword(password)) {
          return done(null, {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
          });
        } else {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
      }
    })
    .catch(err => {
      console.log('[S: Passport Erro]/n', err);
      return done(null, false, { message: 'Incorrect username or password.' });
    });
  }
));

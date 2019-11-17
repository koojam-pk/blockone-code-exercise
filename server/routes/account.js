const getAccounts = require('./../controllers/account').getAccounts;

module.exports = (app) => {
  app.get('/api/accounts', getAccounts);
}
const getTransactions = require('./../controllers/transaction').getTransactions;

module.exports = (app) => {
  app.get('/api/transactions/:id', getTransactions);
}
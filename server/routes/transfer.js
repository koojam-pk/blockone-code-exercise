const transfer = require('./../controllers/transfer').transfer;

module.exports = (app) => {
  app.post('/api/transfer', transfer);
}
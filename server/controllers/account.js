const Account = require('../models').Account;

const getAccounts = (req, res) => {
  Account.findAll({
    order: [['accountName', 'asc']]
    })
    .then(accounts => {
      res.status(200).json({accounts});
    })
    .catch(err =>{
      console.log('[C: Get Accounts Error]\n', err);
      return res.status(400).json({ message: 'Failed to retrieve accounts list'});
    });
}

module.exports = {
  getAccounts
}
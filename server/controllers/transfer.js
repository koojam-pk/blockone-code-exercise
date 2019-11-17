const Transaction = require('../models').Transaction;
const Account = require('../models').Account;
const models = require('../models');

const transfer = (req, res) => {
  const { fromId, toId, amount, ccy, amountInForeign, ccyInForeign, rate } = req.body;
  let transaction;
  models.sequelize.transaction((t) => {    
    return Account.findByPk(fromId, { transaction: t})
      .then(account => {
        return Account.update({
          amount: +account.amount - +amount
        }, {
          where: {id: fromId}
        }, { transaction: t})
      })
      .then(() => {
        return Account.findByPk(toId, { transaction: t});
      })
      .then(account => {
        return Account.update({
          amount: +account.amount + +amountInForeign
          }, {
            where: {id: toId}
          }, { transaction: t})
      })
      .then(() => {
        return Transaction.bulkCreate([
          {
            accountId: fromId,
            action: 'debit',
            description: 'Account Transfer',
            amount,
            ccy,
            amountInForeign,            
            ccyInForeign,
            rate
          },
          {
            accountId: toId,
            action: 'credit',
            description: 'Account Transfer',
            amount: amountInForeign,
            ccy: ccyInForeign,
            amountInForeign: amount,
            ccyInForeign: ccy,
            rate: 1/rate
          }
        ], { transaction: t})
      });
    })
    .then(returnItems => {
      transaction = JSON.parse(JSON.stringify(returnItems)).filter(item => item.action === 'debit')[0];
      return Account.findAll();
    })
    .then(accounts => {
      return res.status(200).json({transaction, accounts});
    })
    .catch(err => {
      console.log('[C: Account Transfer Error]\n', err);
      return res.status(400).json({ message: 'Account transfer unsuccessful'});
    });  
}

module.exports = {
  transfer
}
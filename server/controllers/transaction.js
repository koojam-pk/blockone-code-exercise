const Transaction = require('../models').Transaction;

const getTransactions = (req, res) => {
  Transaction.findAll({
    where: {
      accountId: req.params.id
    },
    attributes: [
      "id", "accountId", "description", "action", "ccy", "amount", "ccyInForeign",
      "amountInForeign", "rate", "createdAt", "updatedAt"
    ],
    order: [['createdAt', 'desc']]
    })
    .then(transactions => {
      res.status(200).json({transactions});
    })
    .catch(err =>{
      console.log('[C: Get Transaction Error]\n', err);
      return res.status(400).json({ message: 'Retrieve transactions list unsuccessful'});
    });
}

module.exports = {
  getTransactions
}
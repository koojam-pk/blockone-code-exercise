const uuidv4 = require('uuid/v4')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({tableName: 'Accounts', schema: 'demo' }, [
      {
        id: uuidv4(),
        accountName: 'SGD Savings Account',
        accountNumber: '001-123-456-1',
        amount: 500000.00,
        ccy: 'sgd',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountName: 'SGD Current Account',
        accountNumber: '016-789-123-9',
        amount: 468500.00,
        ccy: 'sgd',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountName: 'GBP Flex Saver',
        accountNumber: '018-456-123-2',
        amount: 10000.00,
        ccy: 'gbp',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountName: 'USD Savings Account',
        accountNumber: '018-456-123-2',
        amount: 10000.00,
        ccy: 'usd',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountName: 'EUR Savings Account',
        accountNumber: '088-489-175-5',
        amount:7000.00,
        ccy: 'usd',
        createdAt: Sequelize.literal('now()')
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Accounts', null, {})
  }
}
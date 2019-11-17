const uuidv4 = require('uuid/v4')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sgdAccountId = await queryInterface.rawSelect({tableName: 'Accounts', schema: 'demo' }, {
      where: {
        accountName: 'SGD Savings Account'
      }
    }, ['id'])
    const sgdAccount2Id = await queryInterface.rawSelect({tableName: 'Accounts', schema: 'demo' }, {
      where: {
        accountName: 'SGD Current Account'
      }
    }, ['id'])
    const gbpAccountId = await queryInterface.rawSelect({tableName: 'Accounts', schema: 'demo' }, {
      where: {
        accountName: 'GBP Flex Saver'
      }
    }, ['id'])
    const usdAccountId = await queryInterface.rawSelect({tableName: 'Accounts', schema: 'demo' }, {
      where: {
        accountName: 'USD Savings Account'
      }
    }, ['id'])
    const eurAccountId = await queryInterface.rawSelect({tableName: 'Accounts', schema: 'demo' }, {
      where: {
        accountName: 'EUR Savings Account'
      }
    }, ['id'])

    return queryInterface.bulkInsert({tableName: 'Transactions', schema: 'demo' }, [
      {
        id: uuidv4(),
        accountId: sgdAccount2Id,
        description: 'ATM Cheque Deposit',
        action: 'credit',
        amount: 75500.00,
        ccy: 'sgd',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountId: sgdAccount2Id,
        description: 'GIRO Transfer',
        action: 'credit',
        amount: 124500.00,
        ccy: 'sgd',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountId: sgdAccountId,
        description: 'Cheque Deposit Machine',
        action: 'credit',
        amount: 500000.00,
        ccy: 'sgd',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountId: sgdAccountId,
        description: 'MARKONE Withdrawal',
        action: 'debit',
        amount: 9000.00,
        ccy: 'sgd',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountId: sgdAccountId,
        description: 'Internet Banking Transfer',
        action: 'debit',
        amount: 25000.00,
        ccy: 'sgd',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountId: sgdAccountId,
        description: 'PayMe Lah',
        action: 'credit',
        amount: 500.00,
        ccy: 'sgd',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountId: sgdAccountId,
        description: 'ATM Cash Deposit',
        action: 'credit',
        amount: 2000.00,
        ccy: 'sgd',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountId: gbpAccountId,
        description: 'Interactive Brokers',
        action: 'credit',
        amount: 10000.00,
        ccy: 'gbp',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountId: usdAccountId,
        description: 'ATM Cash Deposit',
        action: 'credit',
        amount: 11500.00,
        ccy: 'usd',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountId: usdAccountId,
        description: 'Renewal License',
        action: 'debit',
        amount: 1500.00,
        ccy: 'usd',
        createdAt: Sequelize.literal('now()')
      },
      {
        id: uuidv4(),
        accountId: eurAccountId,
        description: 'Internet Banking Transfer',
        action: 'credit',
        amount: 7000.00,
        ccy: 'eur',
        createdAt: Sequelize.literal('now()')
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {})
  }
}
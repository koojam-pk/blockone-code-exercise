'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable({tableName: 'Accounts', schema:'demo'}, {
      id: {
        type: Sequelize.UUID,
        allowNull: false,        
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      accountName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accountNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ccy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()')
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }, {
      timestamps: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Accounts');
  }
};
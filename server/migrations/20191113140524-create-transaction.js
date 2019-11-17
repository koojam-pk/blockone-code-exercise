'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable({tableName: 'Transactions', schema: 'demo'}, {
      id: {
        type: Sequelize.UUID,
        allowNull: false,        
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      accountId: {
        type: Sequelize.UUID,
        references: {
          model: "Accounts",
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      description: {
        type: Sequelize.STRING
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ccy: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      ccyInForeign: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amountInForeign: {
        type: Sequelize.DECIMAL
      },
      rate: {
        type: Sequelize.DECIMAL,
        defaultValue: 1
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
    return queryInterface.dropTable('Transactions');
  }
};
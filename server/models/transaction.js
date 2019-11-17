'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4
    },
    accountId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'Account',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ccy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    ccyInForeign: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amountInForeign: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },  
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 1
    },    
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    schema: process.env.DBSCHEMA
  });

  Transaction.associate = (models) => {
    models.Transaction.belongsTo(models.Account)
  }

  return Transaction;
};

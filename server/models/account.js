module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    schema: process.env.DBSCHEMA
  });

  Account.associate = (models) => {
    models.Account.hasMany(models.Transaction)
  }

  return Account;
};
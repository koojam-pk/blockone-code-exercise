const bcrypt = require('bcrypt');
const saltRounds = 16;

module.exports =(sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: DataTypes.INTEGER,
    updatedAt: DataTypes.INTEGER,
  }, {
    schema: process.env.DBSCHEMA
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.beforeCreate((user, option) => {
    user.createdAt = Math.floor(Date.now() / 1000);
    return bcrypt.hash(user.password, saltRounds)
      .then(hashedPassword => {
        user.password = hashedPassword;
      })
      .catch(err => {
        console.log('[Password Hashed Failed]', err);
      });
  });

  User.beforeUpdate((user, option) => {
    user.updatedAt = Math.floor(Date.now() / 1000);
  });
  
  return User;
};

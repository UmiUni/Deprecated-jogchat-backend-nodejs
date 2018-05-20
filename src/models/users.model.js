// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const uuidv4 = require('uuid/v4');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: function () {
        return uuidv4();
      },
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    verifyToken: { type: DataTypes.STRING },
    verifyExpires: { type: DataTypes.DATE },
    // verifyChanges: { type: DataTypes.OBJECT },
    resetToken: { type: DataTypes.STRING },
    resetExpires: { type: DataTypes.DATE },
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
};

/* jshint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    password: DataTypes.STRING(500),
    salt : DataTypes.STRING,
    profile_picture_path : DataTypes.STRING,
  },{
    instanceMethods : {

      toJSON: function () {
        var values = this.get();
        values.salt = undefined;
        values.password = undefined;
        return values;
      }

    }
  });

return User;
};

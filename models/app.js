/* jshint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var App = sequelize.define("App", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title : {
      type : DataTypes.STRING,
      allowNull: false,
    },
    description : DataTypes.STRING(1000),
  },{
    classMethods : {
        associate : function(models){
            App.belongsTo(models.User,{
                as : 'createdByUser',
            });
            App.hasMany( models.Version , {
                as : 'versions',
                foreignKey : 'appId'
            });
        },
    },
    instanceMethods : {

    }
  });

return App;
};

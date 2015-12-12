/* jshint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Version = sequelize.define("Version", {
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
            Version.belongsTo(models.User,{
                as : 'createdByUser',
            });
            Version.hasMany( models.VersionDetail , {
                as : 'details',
                foreignKey : 'versionId'
            });
            Version.belongsTo( models.App,{
                as : 'app',
                foreignKey : 'appId'
            });
        },
    },
    instanceMethods : {
      toJSON : function(){
        var values = this.get();
        return values;
      }
    }
  });

return Version;
};

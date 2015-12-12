/* jshint node: true */
"use strict";

// add create empty method

module.exports = function(sequelize, DataTypes) {
  var VersionDetail = sequelize.define("VersionDetail", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title : {
      type : DataTypes.STRING,
      allowNull: false,
    },
    description : DataTypes.STRING(2000),
  },{
    classMethods : {
        associate : function(models){
            VersionDetail.belongsTo(models.User,{
                as : 'createdByUser',
            });
            VersionDetail.belongsTo(models.User,{
                as : 'updatedByUser',
            });
            VersionDetail.belongsTo(models.Image,{
                as : 'featuredImage',
            });
            VersionDetail.belongsTo( models.Version,{
                as : 'version',
                foreignKey : 'versionId'
            });
        },
    },
    instanceMethods : {
      toJSON : function(){
        var values = this.get();
        values.createdAt = undefined;
        values.updatedAt = undefined;
        values.createdByUserId = undefined;
        values.updatedByUserId = undefined;
        return values;
      }
    }
  });

return VersionDetail;
};

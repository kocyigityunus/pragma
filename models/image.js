/* jshint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title : DataTypes.STRING,
    path : DataTypes.STRING,
    shortPath : DataTypes.STRING,
  },{
    classMethods : {
        associate : function(models){
            Image.belongsTo(models.User,{
                as : 'createdByUser',
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

return Image;
};

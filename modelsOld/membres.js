'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class membres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.membres.belongsTo(models.type, {
        foreignKey:{
          allowNull: false
        }
      }),      
      models.membres.hasMany(models.don)
    }
  };
  membres.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'membres',
  });
  return membres;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class don extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.don.belongsTo(models.membres, {
        foreignKey:{
          allowNull: false
        }
      })
    }
  };
  don.init({
    idMembres: DataTypes.INTEGER,
    montant: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'don',
  });
  return don;
};
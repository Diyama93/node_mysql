'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class espacevert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.espacevert.belongsTo(models.etablissements, {
        foreignKey:{
          allowNull: false
        }
      })
    }
  };
  espacevert.init({
    longitide: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'espacevert',
  });
  return espacevert;
};
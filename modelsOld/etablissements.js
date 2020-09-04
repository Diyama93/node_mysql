'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class etablissements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.etablissements.hasMany(models.espacevert)
    }
  };
  etablissements.init({
    nomEts: DataTypes.STRING,
    nomRep: DataTypes.STRING,
    dateFin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'etablissements',
  });
  return etablissements;
};
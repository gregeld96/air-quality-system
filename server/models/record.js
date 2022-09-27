'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      record.belongsTo(models.device, {foreignKey: "device_id"});
    }
  }
  record.init({
    device_id: DataTypes.INTEGER,
    long: DataTypes.DOUBLE,
    lan: DataTypes.DOUBLE,
    pm25: DataTypes.DOUBLE,
    recorded_time: DataTypes.DATE,
    quality: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'record',
  });
  return record;
};
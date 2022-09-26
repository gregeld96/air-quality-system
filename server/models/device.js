'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Device.hasMany(models.Record, {foreignKey: "device_id"});
    }
  }
  Device.init({
    name: DataTypes.STRING,
    long: DataTypes.DOUBLE,
    lan: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};
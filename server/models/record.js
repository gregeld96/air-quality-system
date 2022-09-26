'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Record.belongsTo(models.Device, {foreignKey: "device_id"});
    }
  }
  Record.init({
    device_id: DataTypes.INTEGER,
    long: DataTypes.DOUBLE,
    lan: DataTypes.DOUBLE,
    pm25: DataTypes.DOUBLE,
    recorded_time: DataTypes.DATE,
    quality: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Record',
  });
  return Record;
};
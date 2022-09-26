'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      device_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "devices",
          key: 'id'
        },
        allowNull:false
      },
      long: {
        type: Sequelize.DOUBLE
      },
      lan: {
        type: Sequelize.DOUBLE
      },
      pm25: {
        type: Sequelize.DOUBLE
      },
      recorded_time: {
        type: Sequelize.DATE
      },
      quality: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('records');
  }
};
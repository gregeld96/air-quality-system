'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let list = [
      {
        name: "Good",
        color: "green",
        min: 0,
        max: 25,
      },
      {
        name: "Moderate",
        color: "yellow",
        min: 25,
        max: 55,
      },
      {
        name: "Poor",
        color: "red",
        min: 55,
        max: 110,
      },
      {
        name: "Very Poor",
        color: "black",
        min: 110,
        max: null,
      }
    ];

    let datas = list.map((data) => {
      return {
        ...data,
        createdAt: new Date(),
        updatedAt: null,
      }
    });

    await queryInterface.bulkInsert('categories', datas, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let list = [
      {
        lan: 1.3562551933540412,
        long: 103.814119046508,
      },
      {
        lan: 1.3543911487431701, 
        long: 103.8150000332199, 
      },
      {
        lan: 1.3119780278363717,  
        long: 103.8101316361351,
      },
      {
        lan: 1.3034605513556679, 
        long: 103.84942655546243, 
      },
      {
        lan: 1.2916403322198444, 
        long: 103.87307305558862,
      },
      {
        lan: 1.3206693004739658,  
        long: 103.91671475802741,
      },
      {
        lan: 1.323624326256972, 
        long: 103.95357547881235,
      },
      {
        lan: 1.3517838059295106, 
        long: 103.96852841271568, 
      },
      {
        lan: 1.3808120634190215, 
        long: 103.93079833530845,
      },
      {
        lan: 1.3806382425654677, 
        long: 103.88280984975825, 
      },
      {
        lan: 1.377161822827446, 
        long: 103.86472723201467, 
      },
      {
        lan: 1.3729901124492943, 
        long: 103.83534297818139, 
      }  
    ];

    let datas = list.map((data, index) => {
      return {
        name: `device-${index}`,
        ...data,
        createdAt: new Date(),
        updatedAt: null,
      }
    });

    await queryInterface.bulkInsert('devices', datas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('devices', null, {});
  }
};

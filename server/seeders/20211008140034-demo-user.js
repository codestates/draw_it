'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Users', [
      {
        email: 'test@test',
        nickname: 'test',
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'test2@test',
        nickname: 'test2',
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};

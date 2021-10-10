'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Posts', [
      {
        userId: 1,
        image: 'https://drawit.s3.ap-northeast-2.amazonaws.com/paint.png',
        answer: '오이',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        image: 'https://drawit.s3.ap-northeast-2.amazonaws.com/paint+(1).png',
        answer: '기린',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Posts', null, {});
  },
};

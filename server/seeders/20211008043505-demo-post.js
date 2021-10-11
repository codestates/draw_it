'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Posts', [
      {
        userId: 1,
        image:
          'https://s3-us-west-2.amazonaws.com/secure.notion-static.com/498e1649-8868-4f24-90b7-1d0b5e85951f/paint.png',
        answer: '오이',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        image:
          'https://s3-us-west-2.amazonaws.com/secure.notion-static.com/22c191fc-cb74-4eff-bd88-d0d7b81d5754/paint_(1).png',
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

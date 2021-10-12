'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('user_post_passeds', [
      {
        userId: 1,
        postId: 1,
      },
      {
        userId: 2,
        postId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('user_post_passeds', null, {});
  },
};

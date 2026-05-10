'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [
      {
        name: "Joseph",
        email: "joseph@gmail.com",
        password: await bcrypt.hash("123456", 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Reuben",
        email: "reuben@gmail.com",
        password: await bcrypt.hash("654321", 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Bautista",
        email: "bautista@gmail.com",
        password: await bcrypt.hash("123456", 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Maiko",
        email: "maiko@gmail.com",
        password: await bcrypt.hash("123456", 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Jaye",
        email: "jaye@gmail.com",
        password: await bcrypt.hash("123456", 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Rikako",
        email: "rikako@gmail.com",
        password: await bcrypt.hash("123456", 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Elijah",
        email: "elijah@gmail.com",
        password: await bcrypt.hash("123456", 10),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  }
};

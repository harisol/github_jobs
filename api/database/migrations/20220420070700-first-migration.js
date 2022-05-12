'use strict';

const Sequelize = require('sequelize');

module.exports = {
  /**
   * @param {Sequelize.QueryInterface} queryInterface singleton instance of QueryInterface class.
   * @param {Sequelize} Sequelize sequelize module.
   */
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      const createUsersTable = queryInterface.createTable(
        'users',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          username: {
            allowNull: false,
            type: Sequelize.STRING(50),
            unique: true,
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING(255),
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        },
        { transaction: t }
      );

      
      return Promise.all([
        createUsersTable,
      ]);
    });
  },

  /**
   * @param {Sequelize.QueryInterface} queryInterface singleton instance of QueryInterface class.
   * @param {Sequelize} Sequelize sequelize module.
   */
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('users', { transaction: t }),
      ]);
    });
  },
};

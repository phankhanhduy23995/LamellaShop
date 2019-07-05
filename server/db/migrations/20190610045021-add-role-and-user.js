'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('roles', {
      id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      code: { type: Sequelize.STRING, unique: true, allowNull: false },
      name: { type: Sequelize.STRING }
    })
      .then(function () {
        return queryInterface.createTable('users', {
          id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
          account: { type: Sequelize.STRING, allowNull: false },
          password_digest: { type: Sequelize.STRING },
          fullname: { type: Sequelize.STRING },
          birthday: Sequelize.DATE,
          gender: Sequelize.STRING,
          address: Sequelize.STRING,
          email: Sequelize.STRING,
          phone: Sequelize.STRING,
          token: Sequelize.TEXT,
          active: { type: Sequelize.BOOLEAN, defaultValue: true },
          role_id: {
            type: Sequelize.INTEGER,
            references: { model: 'roles', key: 'id' }
          },
          last_login: Sequelize.DATE,
          status: Sequelize.INTEGER
        });
      })
      .then(function () {
        return queryInterface.createTable('user_roles', {
          id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
          role_id: {
            type: Sequelize.INTEGER,
            references: { model: 'roles', key: 'id' }
          },
          user_id: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' }
          },
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_roles')
      .then(function () {
        return queryInterface.dropTable('users');
      })
      .then(function () {
        return queryInterface.dropTable('roles');
      });
  }
};

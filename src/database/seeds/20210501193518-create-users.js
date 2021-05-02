import bcryptjs from 'bcryptjs';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John',
        email: 'john@gmail.com',
        password: await bcryptjs('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async () => {},
};

// yarn sequelize seed:generate --name <name>
// yarn sequelize db:seed:all

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      queryInterface.addColumn('TenderAttachment', 'Tender_ID', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Tender',
          key: 'ID',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
    queryInterface.addColumn('TenderAttachment', 'URL', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async () => {},
};

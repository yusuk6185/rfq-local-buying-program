module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProposalTenderProduct', {
      ID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Offer: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      TenderProduct_ID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'TenderProduct',
          key: 'ID',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      Proposal_ID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Proposal',
          key: 'ID',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });
  },

  down: async () => {},
};

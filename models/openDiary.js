const Sequelize = require('sequelize');

class openDiary extends Sequelize.Model {
    static initiate(sequelize) {
        openDiary.init({
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'openDiary',
            tableName: 'openDiaries',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        })
    }
}

module.exports = openDiary;
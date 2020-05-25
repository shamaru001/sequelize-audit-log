
module.exports = (Sequelize, DataTypes) => {
    const Audit = Sequelize.define('Audits', {
            user: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            actionType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            table: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            prevValues: {
                type: DataTypes.TEXT,
                allowNull: false,
                get: function() {
                    return JSON.parse(this.getDataValue('prevValues'));
                },
            },
            newValues: {
                type: DataTypes.TEXT,
                allowNull: false,
                get: function() {
                    return JSON.parse(this.getDataValue('newValues'));
                },
            }
        }, {
            updatedAt: false,
            // timestamps: true,
        }
    );

    // Audit.associate = (models) => {
    //
    // };

    return Audit;
};
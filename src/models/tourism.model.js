module.exports = (sequelize, Sequelize) => {
    const tourism = sequelize.define("tourism", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        place_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        rating: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        coordinate: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    }
    );

    return tourism;
}
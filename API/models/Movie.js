'use strict'
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Movie extends Model {
    }
    Movie.init({
        movieId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A Movie ID is required'
                }
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A Title is required'
                }
            }
        },
        releaseDate: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A Release Date is required'
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A Image is required'
                }
            }
        }
    }, { sequelize });

    Movie.associate = (models) => {
        Movie.belongsTo(models.User, {
            foreignKey: {
                fieldName: 'userId',
                allowNull: false
            }
        })
    };

    return Movie;
};
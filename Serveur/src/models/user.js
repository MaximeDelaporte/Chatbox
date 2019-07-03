const bcrypt = require("bcrypt-nodejs");

const user = (sequelize, DataTypes) =>{
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate:{
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        underscored: true,
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validatePassword(password) {
                return bcrypt.compare(password, this.password)
            }
        }
    });
    User.associate = models =>{
        User.hasMany(models.Project, { onDelete: 'CASCADE' })
    };

    User.findByLogin = async login => {
        let user = await User.findOne({
            where: {
                username: login.identifier,
                password: login.password
            },

        });
        if (!user) {
            user = await User.findOne({
                where: {
                    email: login.identifier,
                    password: login.password
                }
            })
        }
        return user;
    };

    User.findAllByUsername = async username => {
        let users = await User.findAll({
            where: {
                username: username
            },
        });
        if (!users) {
            return 'No user found'
        }
        return users
    };

    return User
};
module.exports = user;

const room = (sequelize, DataTypes) =>{
    const Room = sequelize.define('room', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        underscored: true
    });

    Room.findByName = async name => {
        return await Room.findOne({
            where: {name: name},
        })
    };
    Room.findAllByProject = async project => {
        return await Room.findAll({
            where: { project_id: project}
        })
    };

    Room.associate = models =>{
        Room.belongsTo(models.Project);
        Room.hasMany(models.Message, { onDelete: 'CASCADE' });

    };
    return Room
};
module.exports = room;

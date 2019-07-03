const message = (sequelize, DataTypes) =>{
    const Message = sequelize.define('message', {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull:false
        },
    },{
        underscored: true
    });

    Message.findAllByUser = async user => {
        return await Message.findAll({
            where: {author: user},
        })
    };
    Message.findAllByRoom = async room => {
        return await Message.findAll({
            where: { project_id: room}
        })
    };

    Message.associate = models => {
        Message.belongsTo(models.Room)
    };
    return Message;
};

module.exports = message;

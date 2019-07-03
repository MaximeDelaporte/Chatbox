const project = (sequelize, DataTypes) =>{
    const Project = sequelize.define('project', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            defaultValue: []
        }
    },{
        underscored: true
    });
    Project.associate = models =>{
        Project.belongsTo(models.User);
        Project.hasMany(models.Room, { onDelete: 'CASCADE' });

    };
    Project.findByName = async name => {
        return await Project.findOne({
          where: {name: name},
      })
    };
    Project.findAllByUser = async user => {
        return await Project.findAll({
            where: { user_id: user}
        })
    };
    Project.findAllByTag = async tag => {
        return await Project.findAll()
            .then((projects)=>{
                let taggedProjects = [];
                projects.map((project)=>{
                    if(project.tags.includes(tag)){
                        taggedProjects.push(project)
                    }
                });

                return taggedProjects;
            })
            .catch((error)=>{
                console.log(error);
            })
    };
    Project.findAllByUserAndByTag = async req => {
        return await Project.findAll({
            where: {user_id: req.userId}
        })
            .then((projects)=>{
            let taggedProjects = [];
            projects.map((project)=>{
                if(project.tags.includes(req.tag)){
                    taggedProjects.push(project)
                }
            });

            return taggedProjects;
        })
            .catch((error)=>{
                console.log(error);
            })
    };

    return Project
};
module.exports = project;

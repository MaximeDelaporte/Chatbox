import React, { Component} from 'react'

class ProjectList extends Component {

    render() {
        const orderedProjects = [...this.props.projects].sort((a, b) => a.id - b.id)
        return (
            <div className='project-list'>
                <ul>
                    <h3>Your projects :</h3>
                    {orderedProjects.map((project) => {
                        const active = this.props.projectId === project.id ? 'active' : ''
                        return (
                            <li key={project.id} className={'project ' + active}>
                                <a onClick={() => { this.props.subscribeToProject(project.id)}} href='#'>{project.name}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default ProjectList

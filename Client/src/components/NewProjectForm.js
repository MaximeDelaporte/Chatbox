import React, { Component } from 'react'

class NewProjectForm extends  Component{

    constructor() {
        super()
        this.state = {
            projectName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({projectName: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.createProject(this.state.projectName)
        this.setState({projectName: ''})
    }

    render() {
        return (
            <div className='new-project-form'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.projectName}
                        onChange={this.handleChange}
                        type='text'
                        placeholder="Create a Project"
                        required
                    />
                    <button id='create-project-btn' type='submit'>+</button>
                </form>
            </div>
        )
    }
}
export default NewProjectForm

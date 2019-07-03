import React, {Component} from 'react';
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import RoomList from './RoomList'
import NewRoomForm from './NewRoomForm'
import ProjectList from './ProjectList'
import NewProjectForm from './NewProjectForm'
import Login from './Login'
import { endpoint} from "../config"
import axios from 'axios'

import io from "socket.io-client";


class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            username : localStorage.getItem('username') ? localStorage.getItem('username') : '',
            uid : localStorage.getItem('uid') ? localStorage.getItem('uid') : this.generateUID(),
            messages: [],
            projects: [],
            rooms: [],
            joinableRooms: [],
            joinedRooms: [],
            roomId: '',
            projectId:'',
            chat_ready : false,
            endpoint: endpoint,
            socket : null,
            isLoading: false
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.subscribeToRoom = this.subscribeToRoom.bind(this);
        this.subscribeToProject = this.subscribeToProject.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.createProject = this.createProject.bind(this);
        this.addMessage = this.addMessage.bind(this);

    }
    generateUID(){
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz';
        for (let i = 0; i < 15; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        localStorage.setItem('uid', text);
        return text;
    }

    componentDidMount() {
        const socket = io(this.state.endpoint);

        this.setState({
            socket,
            isLoading: true
        });
        setInterval(this.send(), 1000);

        socket.on('connection', (log)=>{
            console.log('Success')
        });
        socket.on('receiveMessage', (msg)=>{
            console.log(msg);
            if(msg.roomId === this.state.roomId){
                    //this.addMessage(msg);
            }
        });
        if(this.state.username.length){
            this.initChat();
            this.getProjects();
        }
    }
    addMessage(data) {
        console.log(data);
        this.setState({
            messages: [...this.state.messages, data]
        });
        console.log(this.state.messages)
    }


    setUsername(username, e){
        this.setState({
            username: username
        }, () =>{
            this.initChat();
        })
    }
    sendMessage(text) {

        this.state.socket.emit('sendMessage', {
            author: 'admin',
            text: text,
            roomId: this.state.roomId
        })
    }
    send(){
        const socket = io(this.state.endpoint);
        socket.emit('connectionIndex')
    }
    initChat(){
        localStorage.setItem('username', this.state.username);
        this.setState({
            chat_ready : true,
            isLoading:false
            }
        )
    }

    async getProjects(){
        this.setState({ isLoading: true});
        try{
            let result = await axios.get('/projects');
            this.setState({
                projects: result.data,
                isLoading: false
            })
        }
        catch (e) {
            console.log(e)
            this.setState({
                error: e,
                isLoading: false
            })
        }
    }

    async subscribeToRoom(roomId){
        this.setState({messages: [], isLoading: true});
        try{
            let result = await axios.get('/messages/'+ roomId)
            this.setState({
                messages: result.data,
                roomId,
                isLoading: false
            })
        }
        catch (e) {
            this.setState({
                error: e,
                isLoading: false
            })
        }
    }
    async subscribeToProject(projectId){
        this.setState({rooms: [], isLoading: true });
        try {
            let result = await axios.get('/rooms/user/admin');
            this.setState({
                projectId,
                roomId: '',
                rooms: result.data,
                isLoading: false
            })
        }
        catch (e) {
            this.setState({
                error: e,
                isLoading: false
            })

        }
    }
    async createMessage(text) {
        this.setState({isLoading: true});
        try{
            const message = {
                author: 'admin',
                text: text,
                roomId: this.state.roomId
            };
            const formattedMessage = {
                author: 'admin',
                roomId: this.state.roomId,
                parts:[{
                    type: 'text/plain',
                    content: text
                }]
            }
            const result = await axios.post('/messages/new', message);
            console.log(result);
            this.setState({
                isLoading: false,
                messages:[...this.state.messages, formattedMessage]
            })
        }
        catch (e) {
            this.setState({
                error: e,
                isLoading:false
            })
        }
    }
    async createRoom(name){
        this.setState({isLoading:true});
        try {
            const room = {
                name,
                userId: 'admin'
            };
            const result = await axios.post('/rooms/new', room);
            this.setState({
                isLoading: false,
                rooms: [...this.state.rooms, result.data]
            });
            this.subscribeToRoom(result.id)
        }
        catch (e) {
            this.setState({
                error: e,
                isLoading:false
            })
        }
    }
    async createProject(name){
        this.setState({isLoading:true});
        try {
            const project = {
                name,
                userId: 'admin'
            };
            const result = await axios.post('/projects/new', project)
            console.log(result);
            this.setState({
                isLoading: false
            })
        }
        catch (e) {
            this.setState({
                error: e,
                isLoading:false
            })
        }
    }

    render() {

        if (this.state.isLoading){
            return <p>Loading...</p>;
        }
        return (

            <div className="app">
                {this.state.chat_ready ? (
                    <React.Fragment>
                        <ProjectList projectId={this.state.projectId} subscribeToProject={this.subscribeToProject} projects={this.state.projects}/>
                        <RoomList roomId={this.state.roomId} subscribeToRoom={this.subscribeToRoom} rooms={this.state.rooms}/>
                        <MessageList roomId={this.state.roomId} messages={this.state.messages}/>
                        <SendMessageForm disabled={!this.state.roomId} sendMessage={this.createMessage}/>
                        <NewRoomForm createRoom={this.createRoom}/>
                        <NewProjectForm/>
                    </React.Fragment>
                ) : (
                    <Login
                        setUsername={this.setUsername.bind(this)}
                    />
                    )
                }

            </div>
        );
    }
}

export default Chat;

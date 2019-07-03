import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'
class MessageList extends Component {

    componentWillUpdate(nextProps, nextState, nextContext) {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }
    }

    render() {
        if (!this.props.roomId){
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; You need to join a room first !
                    </div>

                </div>
            )
        }
        console.log(this.props.messages)
        if (this.props.messages){
            const orderedMessages = [...this.props.messages].sort((a, b) => a.id - b.id)
            return (
                <div className='message-list'>
                    {orderedMessages.map((message, index) => {
                        let text = '';
                        message.parts.map((part) =>{
                            text += part.content

                        });
                        return (
                            <Message key={index} username={message.user_id ? message.user_id : message.author} text={text}/>
                        )
                    })}
                </div>
            )
        }

    }
}

export default MessageList

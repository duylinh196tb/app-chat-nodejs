import React, { Component } from 'react';
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

class Chat extends Component {

    constructor(props) {
        super(props)

        this.state = {
            text: '',
            messages: [],
            messagesLocation: []
        }

        socket.on('connect', () => {
            console.log('connected to server');
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        })

        socket.on('newUser', user => {
            console.log(user);
        })

        socket.on('newMessage', mess => {
            this.setState({ messages: [...this.state.messages, mess] })
        })

        socket.on('newLocationMessage', mess => {
            this.setState({ messages: [...this.state.messages, mess] })
        })

        // socket.emit('createMessage', {
        //     to: 'dl@gmail.com',
        //     text: 'Hello'
        // }, data => {
        //     console.log('Got it', data);
        // })
    }

    onSubmit = e => {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'client',
            text: this.state.text
        }, data => {
            console.log('Got it', data);
        })
    }

    sendLocation = () => {
        if (!navigator.geolocation) {
            return console.log('Your browser not support ');
        }

        navigator.geolocation.getCurrentPosition(position => {
            socket.emit('createLocationMessage', {
                from: 'client',
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        })
    }

    render() {
        return (
            <div>
                <ol>
                    {this.state.messages.map((mess, index) => {
                        if (mess.text)
                            return <li key={index}>{mess.from + ': ' + mess.text}</li>
                        if (mess.url)
                            return <li key={index} >{mess.from + ': '} <a href={mess.url}>Link</a> </li>
                    })}

                </ol>
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.text} onChange={e => this.setState({ text: e.target.value })} />
                    <button>Submit</button>
                    <button onClick={this.sendLocation} > Send location</button>
                </form>
            </div>
        );
    }
}

export default Chat;
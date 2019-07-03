import React, { Component } from 'react'

class Server extends Component {
    constructor() {
        super();
        this.state = {
            userId: 'admin',
            endpoint: 'http://127.0.0.1:8080'
        }
    }
}

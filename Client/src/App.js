import React, {Component} from 'react';
import './App.css';
import Navbar from './components/NavBar';
import Chat from './components/Chat';


class App extends Component{

    render(){
        return(
            <React.Fragment>
                {/*<Navbar/>*/}
                <Chat/>
            </React.Fragment>
        )
    }
}
export default App;

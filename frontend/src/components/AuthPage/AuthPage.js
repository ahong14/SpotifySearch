import React, { Component } from 'react';
import axios from 'axios';
import './AuthPage.css';

//Component to display login page
class AuthPage extends Component{
    render(){
        return(
            <div className = "container-fluid content">
                <div id = "loginContent">
                    <img id = "spotifyLogo" src = "https://i.pinimg.com/originals/a7/26/44/a726446dc5df987cd403be79db247ab7.png" alt = "spotify logo"/>
                    <a id = "loginButton" href = "http://localhost:4000/api/auth"> <button  type="button" className="btn btn-primary btn-lg">Login</button> </a>
                </div>
            </div>
        );
    }
}

export default AuthPage;

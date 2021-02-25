import { Component } from "react";
import './LoginPage.css'
import {Redirect} from 'react-router-dom';
import { UserContext } from "../UserContext";
import TokenService from '../services/token-service';

class Login extends Component{

    static contextType = UserContext;
    constructor(props){
        super(props);
        
        this.state = {
            loggedIn: false,

        }
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    }

    handleEmailChange = (e) => {
        //e.preventDefault()
        const target = e.target;
        const value = target.value;
        this.setState(state => ({
            email: value
        }))
    }

    handlePassChange = (e) => {
        //e.preventDefault()
        const target = e.target;
        const value = target.value;
        this.setState(state => ({
            password: value
        }))
    }

    sendState = (e) => {
        e.preventDefault();
        const email= this.state.email;
        const name= this.state.name;
        this.context.updateUser(email, name)
    }

    handleSubmitLogin(e){
        e.preventDefault()
        fetch('https://movie-ouija.herokuapp.com/user/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'data-type': 'json'
            },
            body: JSON.stringify({
               email: `${this.state.email}`,
                password: `${this.state.password}`
            })
        })
        
        .then(res => {
            if(!res.ok) {
                throw new Error(res.status)
            } else {
                return res.json()
            }
        })
        .then(resJson => 
           TokenService.saveAuthToken(resJson))
        .then(
           () => this.props.getState()
        )
        .then(() => this.props.history.push('/home'))    
        .catch(err => {
            alert(err + ' Login failed')
        })   
         
      
      
      return <Redirect to="/home" />
      
   }
   

   handleLogout(){
       TokenService.clearAuthToken()
   }

    render(){
        if(TokenService.hasAuthToken()){
            return(
                <div className='logout'>
                    <form onSubmit={this.handleLogout}>
                        <h1>It appears you are already logged in.</h1>
                        <button type='submit'>Log Out?</button>
                    </form>
                </div>
            )
        } else {
            return(
                <form className='loginForm' onSubmit={this.handleSubmitLogin}>
                    <h3>Log In</h3>
                    <input className='emailInput' placeholder='Email' onChange={this.handleEmailChange}></input>
                    <input type="password" className='passwordInput' placeholder='Password' onChange={this.handlePassChange}></input>
                    <button className='logInSubmit'>Submit</button>
                </form>
            )
        }
    }
}

export default Login;
import { Component } from "react";
import './Landing.css'
import {Redirect} from 'react-router-dom';
import { UserContext } from "../UserContext";


export default class Landing extends Component{

    static contextType = UserContext
    constructor(props){
        super(props);
        
        this.state = {
            created: false,

        }
        this.handleSubmitNewUser = this.handleSubmitNewUser.bind(this);
    }


    handleEmailChange = (e) => {
        const target = e.target;
        const value = target.value;
        this.setState(state => ({
            email: value
        }))
    }

    handleNameChange = (e) => {
        //e.preventDefault()
        const target = e.target;
        const value = target.value;
        this.setState(state => ({
            name: value
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

    handleSubmitNewUser(e){
        e.preventDefault()
         fetch('https://movie-ouija.herokuapp.com/user/create', {
             method: 'POST',
             headers: {
                 'content-type': 'application/json'
             },
             body: JSON.stringify({
                email: `${this.state.email}`,
                 name: `${this.state.name}`,
                 password: `${this.state.password}`
             })
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(res.status)
            } 
        })
        .then(
            this.setState({
                created: true
            })
            
        )
        .then(() => this.props.history.push('/login'))
        .catch(err => {
            alert(err + ' Creation failed. Does the user already exist?')
        })
    }

    render(){
        
        return(
            <div className='aboutPage'>
                <h1>Landing Page</h1>
                <p>Call on the spirits to determine your fate. What shall you watch tonight?</p>
                <form onSubmit={this.handleSubmitNewUser}>
                <p>If you're new here, use this form to create an account.</p>
                <input id='createEmail' name='email' placeholder='Email Address' onChange={this.handleEmailChange} required />
                <input id='createName' name='name' placeholder='First Name' onChange={this.handleNameChange} required />
                <input id='createPass' name='pass' placeholder='Password' onChange={this.handlePassChange} required />
                <button type='submit'>Submit</button>
                </form>
            </div>
        )
        
    }
}
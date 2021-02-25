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

    checker= (e) =>{
        e.preventDefault()
        console.log(this.state)
    }

    handleEmailChange = (e) => {
        //e.preventDefault()
        const target = e.target;
        const value = target.value;
        this.setState(state => ({
            email: value
        }))
        console.log(this.state.email)
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

    

    sendState = (e) => {
        e.preventDefault();
        const email= this.state.email;
        const name= this.state.name;
        this.context.updateUser(email, name)
    }

    handleSubmitNewUser(e){
        
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
            } else {
                alert('Creation successful. Please go to login.')
            }
        })
        .then(
            this.setState({
                created: true
            })
            
        )
        .catch(err => {
            alert(err + ' Creation failed. Does the user already exist?')
        })
       console.log('creating', this.state)
       return <Redirect to='/login' />
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
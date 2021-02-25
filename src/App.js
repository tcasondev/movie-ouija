import logo from './logo.svg';
import './App.css';
//import './assets/css/fonts.css';

import NavBar from './NavBar/NavBar'
import {Route, Link} from 'react-router-dom'
import Landing from './Landing/Landing'
import LoginPage from './LoginPage/LoginPage'
import MovieList from './MovieList/MovieList'
import OuijaPage from './OuijaPage/OuijaPage';
import { Component } from 'react';
import UserContextProvider from './UserContext';
import { UserContext } from './UserContext';
import TokenService from './services/token-service';
import {Redirect} from 'react-router-dom';
import AboutPage from './AboutPage/AboutPage'


class App extends Component {
  static contextType = UserContext;
  constructor(props){
    super(props);
    this.state= this.context
    
  }

  

  getState = () => {
    this.setState({
      
      isLoggedIn: true
    })
    console.log(this.state)
  }

  render(){
    console.log(TokenService.hasAuthToken())
    var loggedIn = TokenService.hasAuthToken()
  return (
    <main>
      <UserContextProvider>
        <NavBar />
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' render={(renderProps) => <LoginPage {...renderProps} getState={this.getState} />} />
        <Route exact path='/my-list' component={MovieList}/>
        <Route exact path='/about' component={AboutPage} />
        <Route exact path='/ouija' component={OuijaPage} />
        <Route exact path='/home'>
        {loggedIn === true ? <Redirect from='/home' to='/ouija' /> : <Landing />}  
        </Route> 
      </UserContextProvider>
    </main>
    );
  }
}

export default App;

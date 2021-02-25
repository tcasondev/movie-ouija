import React, { createContext, Component } from 'react';

export const UserContext = createContext({
    email: null,
    name: null,
    isLoggedIn: false
});

class UserContextProvider extends Component {
    state = {
        email: null,
        name: null,
        isLoggedIn: false,
        movieList: []
    }

    updateMovies = (movies) => {
        this.setState(state => ({
            movieList: movies
        }))
    }

    updateUser = (email, name) => {
        this.setState(state =>({
            email: email,
            name: name,
            isLoggedIn: true
            
        }))
        sessionStorage.setItem('isLoggedIn', true)
    }
    render(){
        return (
            <UserContext.Provider value={{...this.state, updateUser: this.updateUser, updateMovies: this.updateMovies}}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserContextProvider;
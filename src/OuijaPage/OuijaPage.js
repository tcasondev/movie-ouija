/* eslint-disable no-unused-vars */
import {Route, Link} from 'react-router-dom'
import Landing from '../Landing/Landing';
import MovieObject from '../MovieObject/MovieObject'
import { Component } from "react";
import { UserContext } from '../UserContext';
import UserContextProvider from '../UserContext';
import TokenService from '../services/token-service';
import ouijaLoading from '../Assets/ouijaLoading.gif';
import './OuijaPage.css';

export default class OuijaPage extends Component{
    static contextType = UserContext;
    constructor(props){
        super(props)
        this.state = {
            ouija: false,
            searching: false
        }
        this.getRandomMovie = this.getRandomMovie.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
        this.setMovie = this.setMovie.bind(this)
    }

    getMovies(){
        fetch('https://movie-ouija.herokuapp.com/movies', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(result => result.json())
        .then(resultJson => 
            {console.log(resultJson) 
            this.setState(state => ({
                movieList: resultJson
            }))
        }
        )
    }

    componentWillMount() {
        this.getMovies();
        
    }
    
    setMovie(){
        setTimeout(function() {
            this.setState({
                searching: false,
                ouija: true
            })
        }.bind(this), 3000);
    }

    getRandomMovie(){
        let length = this.state.movieList.length;
        let genre = this.state.genre;
        let movie =  this.state.movieList[Math.floor(Math.random() * length)]
        let filterMovieList = this.state.movieList.filter(filterMovie => filterMovie.genre === genre)
        let filterMovie = filterMovieList[Math.floor(Math.random() * filterMovieList.length)]
        
        if(!this.state.genre || this.state.genre === 'Genre'){
            this.setState({
                searching: true,
                chosenMovie: movie
            })
            console.log(movie)
        } else {
            this.setState({
                searching: true,
                chosenMovie: filterMovie
            })
            console.log(filterMovie)
        }
    }

    handleClickOuija = () => {
        this.setState({
            searching: true,
            ouija: false,
            chosenMovie: null
        })
        this.getRandomMovie();
        this.setMovie();
    }

    handleChangeGenre = (e) => {
        const target = e.target;
        const value = target.value;
        this.setState(state => ({
            genre: value
        }))
    }

    render(){
        console.log(this.context.isLoggedIn)
        if(TokenService.hasAuthToken() && this.state.ouija === false && this.state.searching === false){
            
            return(
                <div className='OuijaArea'>
                    <h1>Divine a choice</h1>
                    <div className='ouijaForm'>
                        
                        <p>If you'd like you may ask the spirits for a specific genre, though this is not required</p>
                        <select className='genreSelect' onChange={this.handleChangeGenre}>
                            <option value='none'>Genre</option>
                            <option>Action</option>
                            <option>Drama</option>
                            <option>Christmas</option>
                            <option>Comedy</option>
                            <option>Horror</option>
                            <option>Romance</option>
                            <option>Sci-Fi</option>
                            <option>Thriller</option>
                        </select>
                        <button onClick={this.handleClickOuija}>Ouija</button>
                    </div>
                    <br />
                    <div className='returnArea'>
                        
                    </div>
                </div>
            )
        } 
        else if (TokenService.hasAuthToken() && this.state.ouija === true){
            return(
                <div className='OuijaArea'>
                    <h1>Divine a choice</h1>
                    <div className='ouijaForm'>
                        
                        <p>If you'd like you may ask the spirits for a specific genre, though this is not required</p>
                        <select className='genreSelect' onChange={this.handleChangeGenre}>
                            <option value={null}>Genre</option>
                            <option>Action</option>
                            <option>Drama</option>
                            <option>Christmas</option>
                            <option>Comedy</option>
                            <option>Horror</option>
                            <option>Romance</option>
                            <option>Sci-Fi</option>
                            <option>Thriller</option>
                        </select>
                        <button onClick={this.handleClickOuija}>Ouija</button>
                    </div>
                    <br />
                    <div className='returnArea'>
                            
                        <MovieObject 
                            title={this.state.chosenMovie.title}
                            genre={this.state.chosenMovie.genre}
                        />
                    </div>
                </div>
            )
        } 
        else if (TokenService.hasAuthToken() && this.state.searching === true) {
            return(
                <div className='OuijaArea'>
                    <h1>Divine a choice</h1>
                    <div className='ouijaForm'>
                        
                        <p>If you'd like you may ask the spirits for a specific genre, though this is not required</p>
                        <select className='genreSelect' onChange={this.handleChangeGenre}>
                            <option value={null}>Genre</option>
                            <option>Action</option>
                            <option>Drama</option>
                            <option>Christmas</option>
                            <option>Comedy</option>
                            <option>Horror</option>
                            <option>Romance</option>
                            <option>Sci-Fi</option>
                            <option>Thriller</option>
                        </select>
                        <button onClick={this.handleClickOuija}>Ouija</button>
                    </div>
                    <br />
                    <div className='imgArea'>
                        <img src={ouijaLoading} alt="ouijaLoading" />    
                        
                    </div>
                </div>
            )
        }

        // else {
        //     return(
                
        //         <Landing />
            
        //     )
        // }
    }
}
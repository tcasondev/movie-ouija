import { Component } from "react";
import './MovieList.css'
import { UserContext } from "../UserContext";
import TokenService from '../services/token-service';
import MovieObject from "../MovieObject/MovieObject";


export default class MovieList extends Component{
    static contextType = UserContext;
    constructor(props){
        super(props);
        
        this.state = {
            movieList: [],
            updateToggle: false
        }
        this.componentWillMount = this.componentWillMount.bind(this)
        this.toggleUpdate = this.toggleUpdate.bind(this)
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

    handleChangeTitle = (e) => {
        const target = e.target;
        const value = target.value;
        this.setState(state => ({
            title: value
        }))
    }

    handleChangeGenre = (e) => {
        const target = e.target;
        const value = target.value;
        this.setState(state => ({
            genre: value
        }))
    }

    handleSubmitNewMovie = (e) => {
        e.preventDefault()
        fetch('https://movie-ouija.herokuapp.com/movies/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
               email: `${this.context.email}`,
                title: `${this.state.title}`,
                genre: this.state.genre
            })
        })
        .then(result => result.json())
        .then(resultJson => {
            this.setState({
                movieList: [...this.state.movieList, resultJson]
            })
        })
        //.then(this.getMovies())
        .then(this.renderMovies())
        }

    toggleUpdate = () => {
        this.setState(state => ({
            updateToggle: !this.state.updateToggle
        })
        )    
        
    }


    renderMovies = () => {
        return (
            this.state.movieList.map(movie => 
                <MovieObject 
                title={movie.title}
                genre={movie.genre}
                hasButton={true}
                id={movie.movie_id}
                rerenderParentCallback={this.renderMovies}
                />
            )
        )
    }

    render(){
        console.log(this.state)
        if(!TokenService.hasAuthToken()){
            return(
                <div>
                    <h1>Please log in.</h1>
                </div>
            )
        } else {
            return(
                <div className="movieList">
                    <h1>Movie List</h1>
                    <form onSubmit={this.handleSubmitNewMovie}>
                        <h3>Add a movie to your list so the spirits know your options.</h3>
                        <input className='movieInput' placeholder="title" onChange={this.handleChangeTitle} required />
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
                        <button type="submit">Submit</button>
                    </form>
                    <br />
                    <section className='listArea'>
                    {this.renderMovies()}
                    </section>
                </div>
            )
        }
    }
}
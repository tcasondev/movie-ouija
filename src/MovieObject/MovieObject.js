import { Component } from "react";
import "./MovieObject.css";
import TokenService from "../services/token-service";

export default class MovieObject extends Component {
  //API call to delete movie
  handleDeleteMovie = (id) => {
    //e.preventDefault()
    fetch("https://movie-ouija.herokuapp.com/movies/delete", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then(this.props.rerenderParentCallback());
  };

  render() {
    //Movie objects rendered with or without delete button
    const title = this.props.title;
    const genre = this.props.genre;
    const movie_id = this.props.id;
    if (this.props.hasButton === true) {
      return (
        <div key={movie_id} className="movieObject">
          <section className="movieInfo">
            <h3>{title}</h3>
            <p>{genre}</p>
          </section>
          <section id={movie_id} className="interactions">
            <button
              id={movie_id}
              onClick={() => this.handleDeleteMovie(movie_id)}
            >
              Delete
            </button>
          </section>
        </div>
      );
    } else {
      return (
        <div key={movie_id} className="movieObject">
          <section className="movieInfo">
            <h3>{title}</h3>
            <p>{genre}</p>
          </section>
        </div>
      );
    }
  }
}

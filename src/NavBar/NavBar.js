import { Component } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <nav>
        <h3>
          <Link to="/home">Home</Link>
        </h3>
        <div className="UserLinks">
          <h3>
            <Link to="/login">Log In</Link>
          </h3>
          <h3>
            <Link to="/my-list">My List</Link>
          </h3>
          <h3>
            <Link to="/about">About</Link>
          </h3>
        </div>
      </nav>
    );
  }
}

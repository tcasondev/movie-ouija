import { Component } from "react";

export default class AboutPage extends Component {
  render() {
    return (
      <div className="about">
        <h1>About the app:</h1>
        <p>
          Movie Ouija was created both for fun and as a class project. I intend
          to use it as a proof-of-concept for a larger project in the future.
        </p>
        <p>
          Movie Ouija is a way to settle the debate of "What are we going to
          watch tonight?". Surrender control and let the spirits decide. If
          you're worried, this app makes no effort to perform any actual
          religious or spiritual rituals. It's just the ghosts in the machines.
        </p>
        <p>
          If you have feedback, concerns, suggestions, or need to report an
          issue, feel free to email tcasondev@gmail.com.
        </p>
        <h3>Happy Summoning!</h3>
      </div>
    );
  }
}

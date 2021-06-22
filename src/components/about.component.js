import React, { Component } from "react";
class About extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0.5)), url(./gift-card-wall-800x960.jpg)",
          height: "66vh",
        }}
      >
        <h3>About</h3>
        <div
          style={{
            fontWeight: "bold",
            fontStyle: "oblique",
            fontSize: "large",
          }}
        >
          <p>
            Our Gift Card Shop is designed to serve our customers in Israel and
            around the world.
          </p>
          <p>
            Each customer can order and buy for himself and his acquaintances a
            card that matches his budget, his needs and his favorite credit card
            company.
          </p>
          <p>
            We believe in direct contact with customers and therefore we are
            available to you in a variety of different means of communication.
          </p>
          <p>
            We would love to hear from you suggestions for improving,
            streamlining and tailoring a personal experience for each and every
            one of you.
          </p>
        </div>
      </div>
    );
  }
}

export default About;

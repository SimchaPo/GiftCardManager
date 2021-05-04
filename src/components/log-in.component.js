import React, { Component } from "react";
import axios from "axios";
import qs from "qs";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getcuruser = this.getcuruser.bind(this);
    this.state = { email: "", password: "" };
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(user);
    axios
      .post("http://localhost:5000/users/login", qs.stringify(user), {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  getcuruser(e) {
    e.preventDefault();
    axios
      .get("http://localhost:5000/users/getcuruser", {
        withCredentials: true,
      })

      .then((res) => console.log("cur user", res.data))
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>User Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            value={this.state.email}
            onChange={this.onChangeEmail}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={this.state.password}
              onChange={this.onChangePassword}
              placeholder="Password"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
        <button onClick={this.getcuruser} className="btn btn-primary">
          abc
        </button>
      </form>
    );
  }
}

export default LogIn;

import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    this.props.login(user, () => {
      this.props.history.push("/");
    });
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
      </form>
    );
  }
}

export default withRouter(LogIn);

import React, { Component } from "react";
import axios from "axios";
import qs from "qs";

class CreateNewUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { userName: "", email: "", password: "" };
  }

  onChangeUserName(e) {
    this.setState({ userName: e.target.value });
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
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
    };

    console.log(user);
    axios
      .post("http://localhost:5000/users/adduser", qs.stringify(user), {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    this.setState({ userName: "", email: "", password: "" });
  }
  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>User Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.userName}
              onChange={this.onChangeUserName}
            />
            <label>User Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
            <label>User Password: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateNewUser;

import React, { Component } from "react";
import axios from "axios";
import qs from "qs";

class EditUser extends Component {
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

    console.log("user to update", user);
    axios
      .post(
        "http://localhost:5000/users/update/" + this.props.match.params.id,
        qs.stringify(user),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    console.log("id:", this.props.match.params.id);
    axios
      .get(
        "http://localhost:5000/users/getuserbyid/" + this.props.match.params.id
      )
      .then((res) =>
        this.setState({
          userName: res.data.userName,
          email: res.data.email,
          password: res.data.password,
        })
      );
  }
  render() {
    return (
      <div>
        <h3>Edit User</h3>
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
              value="Edit User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditUser;

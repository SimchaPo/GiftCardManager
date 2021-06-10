import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const User = (props) => (
  <tr>
    <td>{props.user.userName}</td>
    <td>{props.user.email}</td>
    <td>
      <Link className="btn btn-link" to={"/edit/" + props.user._id}>
        edit
      </Link>
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);
class UsersList extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = { users: [], error: null };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/users", {
        withCredentials: true,
        timeout: 5000,
      })
      .then((res) => {
        console.log("res", res);
        if (res.data.length > 0) {
          this.setState({
            users: res.data,
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response?.data.errorMessage,
        });
      });
  }
  deleteUser(id) {
    console.log(id);
    axios
      .delete("http://localhost:5000/users/delete/" + id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    this.setState({ users: this.state.users.filter((el) => el._id !== id) });
  }
  UsersList() {
    return this.state.users.map((user) => {
      return <User user={user} deleteUser={this.deleteUser} key={user._id} />;
    });
  }
  render() {
    return this.state.error ? (
      <h3 className="text-center">{this.state.error}</h3>
    ) : (
      <div>
        <h3>Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Edit | Delete</th>
            </tr>
          </thead>
          <tbody>{this.UsersList()}</tbody>
        </table>
      </div>
    );
  }
}

export default UsersList;

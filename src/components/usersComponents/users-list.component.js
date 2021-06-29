import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";
import ROLE from "../../roles.enum";
import useBlog from "../../hooks/useBlog";
import { useAuth } from "../../hooks/use-auth";

const User = (props) => (
  <tr>
    <td>{props.user.userName}</td>
    <td>{props.user.likes}</td>
    <td>{props.user.dislikes}</td>
    {props.userType === ROLE[0] && (
      <>
        <td>{props.user.email}</td>
        <td className="text-center">
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
      </>
    )}
  </tr>
);
export default function UsersList(props) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { posts } = useBlog();
  const reducer = (a, b) => a + b;

  useEffect(() => {
    axios
      .get("http://localhost:5000/users", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res);
        if (res.data.length > 0) {
          let usersList = res.data;
          usersList.map((user) => {
            user.likes = posts
              .filter((post) => post.postAuthor._id === user._id)
              .map((post) => post.likes.length)
              .reduce(reducer, 0);
            user.dislikes = posts
              .filter((post) => post.postAuthor._id === user._id)
              .map((post) => post.dislikes.length)
              .reduce(reducer, 0);
            console.log("likes,dislikes", user.likes, user.dislikes);
            return user;
          });
          setUsers(usersList);
          setError(null);
        }
      })
      .catch((error) => {
        setError(error.response?.data.errorMessage);
      });
  }, [user]);
  useEffect(() => {
    let usersList = users;
    usersList.map((user) => {
      user.likes = posts
        .filter((post) => post.postAuthor._id === user._id)
        .map((post) => post.likes.length)
        .reduce(reducer, 0);
      user.dislikes = posts
        .filter((post) => post.postAuthor._id === user._id)
        .map((post) => post.dislikes.length)
        .reduce(reducer, 0);
      console.log("likes,dislikes", user.likes, user.dislikes);
      return user;
    });
    setUsers(usersList);
  }, [posts, users]);
  const deleteUser = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:5000/users/delete/" + id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setUsers(users.filter((el) => el._id !== id));
  };
  const UsersList = () => {
    return users.map((userItem) => {
      return (
        <User
          userType={user.userType}
          user={userItem}
          deleteUser={deleteUser}
          key={userItem._id}
        />
      );
    });
  };
  return (
    <div>
      <h3>Users</h3>
      {(error && <h4 className="text-center">{error}</h4>) ||
        (user && (
          <Table striped bordered hover variant="dark">
            <thead className="thead-light">
              <tr>
                <th>User Name</th>
                <th>Likes</th>
                <th>Dislikes</th>
                {user.userType === ROLE[0] && (
                  <>
                    <th>Email</th>
                    <th className="text-center">Edit | Delete</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>{UsersList()}</tbody>
          </Table>
        ))}
    </div>
  );
}

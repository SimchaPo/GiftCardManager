import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useAuth } from "../../authentication/use-auth";
import ROLE from "../../roles.enum";

const User = (props) => (
  <tr>
    <td>{props.user.userName}</td>
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
  useEffect(() => {
    axios
      .get("http://localhost:5000/users", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res);
        if (res.data.length > 0) {
          setUsers(res.data);
          setError(null);
        }
      })
      .catch((error) => {
        setError(error.response?.data.errorMessage);
      });
  }, [user]);
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

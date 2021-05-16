import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Store = (props) => (
  <tr>
    <td>{props.store.storeName}</td>
    <td>{props.store.website}</td>
    <td>
      <Link to={"/edit/" + props.store._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteStore(props.store._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);
class StoresList extends Component {
  constructor(props) {
    super(props);
    this.deleteStore = this.deleteStore.bind(this);
    this.state = { stores: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/stores")
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            stores: res.data,
          });
        }
      })
      .catch((error) => console.log(error));
  }
  deleteStore(id) {
    console.log(id);
    axios
      .delete("http://localhost:5000/stores/delete/" + id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    this.setState({ stores: this.state.stores.filter((el) => el._id !== id) });
  }
  StoresList() {
    return this.state.stores.map((store) => {
      return (
        <Store store={store} deleteStore={this.deleteStore} key={store._id} />
      );
    });
  }
  render() {
    return (
      <div>
        <h3>Stores</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Store Name</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>{this.StoresList()}</tbody>
        </table>
      </div>
    );
  }
}

export default StoresList;

import React, { Component } from "react";
import axios from "axios";
import qs from "qs";

class CreateNewStore extends Component {
  constructor(props) {
    super(props);
    this.onChangeStoreName = this.onChangeStoreName.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { storeName: "", website: "" };
  }

  onChangeStoreName(e) {
    this.setState({ storeName: e.target.value });
  }
  onChangeWebsite(e) {
    this.setState({ website: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const store = {
      storeName: this.state.storeName,
      website: this.state.website,
    };

    console.log("store", store);
    axios
      .post("http://localhost:5000/stores/addstore", qs.stringify(store), {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => console.log("data after add store", res.data))
      .catch((err) => console.log(err));
    this.setState({ storeName: "", website: "" });
  }
  render() {
    return (
      <div>
        <h3>Create New Store</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Store Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.storeName}
              onChange={this.onChangeStoreName}
            />
            <label>Store Website:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.website}
              onChange={this.onChangeWebsite}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Store"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateNewStore;

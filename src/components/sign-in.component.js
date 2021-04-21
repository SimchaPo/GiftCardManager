import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import SearchList from "./search-city-list.component.js";
import { set } from "mongoose";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeAddress2 = this.onChangeAddress2.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userName: "",
      email: "",
      password: "",
      address: "",
      address2: "",
      city: null,
      zip: "",
      cities: [],
    };
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
  onChangeAddress(e) {
    this.setState({ address: e.target.value });
  }
  onChangeAddress2(e) {
    this.setState({ address2: e.target.value });
  }

  onChangeZip(e) {
    this.setState({ zip: e.target.value });
  }
  onChangeCity = (city) => {
    this.setState({ city: city });
  };

  onSubmit(e) {
    e.preventDefault();
    const user = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      address2: this.state.address2,
      city: this.state.city,
      zip: this.state.zip,
    };
    console.log(user);
  }
  componentDidMount() {
    axios
      .get(
        "https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json"
      )
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            cities: res.data.map((city) => ({
              value: city.name,
              label: city.name,
            })),
          });
        }
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <form>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            id="inputUserName"
            value={this.state.userName}
            onChange={this.onChangeUserName}
            placeholder="User Name"
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              value={this.state.email}
              onChange={this.onChangeEmail}
              placeholder="Email"
            />
          </div>
          <div className="form-group col-md-6">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              value={this.state.password}
              onChange={this.onChangePassword}
              placeholder="Password"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            value={this.state.address}
            onChange={this.onChangeAddress}
            placeholder="1234 Main St"
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Address 2</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              value={this.state.address2}
              onChange={this.onChangeAddress2}
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="form-group col-md-4">
            <label>City</label>
            <SearchList
              options={this.state.cities}
              getSelectedOption={this.onChangeCity}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Zip</label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              value={this.state.zip}
              onChange={this.onChangeZip}
              placeholder="Zip"
            />
          </div>
        </div>

        <button
          onClick={this.onSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Sign in
        </button>
      </form>
    );
  }
}

export default SignIn;

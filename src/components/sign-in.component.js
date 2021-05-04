import React, { Component } from "react";
import SearchList from "./search-list.component.js";
import csc from "country-state-city";
import axios from "axios";
import qs from "qs";
import UserTemplate from "./user-template.component.js";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userName: "",
      email: "",
      password: "",
      address: "",
      country: null,
      city: null,
      zip: "",
      countries: [],
      cities: [],
      mes1: "",
      mes2: "",
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

  onChangeZip(e) {
    this.setState({ zip: e.target.value });
  }
  onChangeCity = (city) => {
    this.setState({ city: city, mes2: "" });
  };
  onChangeCountry = (country) => {
    this.setState({
      country: country,
      city: null,
      mes1: "",
      cities: csc.getCitiesOfCountry(country.value).map((city) => ({
        value: city.name,
        label: city.name,
      })),
    });
  };

  onSubmit(e) {
    e.preventDefault();
    if (this.state.country !== null && this.state.city !== null) {
      const user = {
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        country: this.state.country.label,
        city: this.state.city.label,
        zip: this.state.zip,
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
      this.setState({
        userName: "",
        email: "",
        password: "",
        address: "",
        country: null,
        city: null,
        zip: "",
        countries: csc.getAllCountries().map((country) => ({
          value: country.isoCode,
          label: country.name,
        })),
        cities: [],
        mes1: "",
        mes2: "",
      });
    } else {
      this.setState({
        mes1: this.state.country !== null ? "" : "Select Country",
        mes2: this.state.city !== null ? "" : "Select City",
      });
    }
  }
  componentDidMount() {
    this.setState({
      countries: csc.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
    });
  }

  render() {
    return (
      <UserTemplate
        head="Sign In"
        onSubmit={this.onSubmit}
        userName={this.state.userName}
        onChangeUserName={this.onChangeUserName}
        email={this.state.email}
        onChangeEmail={this.onChangeEmail}
        password={this.state.password}
        onChangePassword={this.onChangePassword}
        address={this.state.address}
        onChangeAddress={this.onChangeAddress}
        countries={this.state.countries}
        cities={this.state.cities}
        country={this.state.country}
        onChangeCountry={this.onChangeCountry}
        city={this.state.city}
        onChangeCity={this.onChangeCity}
        zip={this.state.zip}
        onChangeZip={this.onChangeZip}
      />
    );
  }
}

export default SignIn;

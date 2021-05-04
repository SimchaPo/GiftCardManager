import React, { Component } from "react";
import SearchList from "./search-list.component.js";

class UsersTemplate extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            id="inputUserName"
            value={this.props.userName}
            onChange={this.props.onChangeUserName}
            placeholder="User Name"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              value={this.props.email}
              onChange={this.props.onChangeEmail}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              value={this.props.password}
              onChange={this.props.onChangePassword}
              placeholder="Password"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            value={this.props.address}
            onChange={this.props.onChangeAddress}
            placeholder="1234 Main St"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-5">
            <label>Country</label>
            <SearchList
              options={this.props.countries}
              getSelectedOption={this.props.onChangeCountry}
            />
          </div>
          <div className="form-group col-md-5">
            <label>City</label>
            <SearchList
              options={this.props.cities}
              getSelectedOption={this.props.onChangeCity}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Zip</label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              value={this.props.zip}
              onChange={this.props.onChangeZip}
              placeholder="Zip"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-5">
            <label style={{ color: "red" }}>{this.props.mes1}</label>
          </div>
          <div className="form-group col-md-5">
            <label style={{ color: "red" }}>{this.props.mes2}</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {this.props.head}
        </button>
      </form>
    );
  }
}

export default UsersTemplate;

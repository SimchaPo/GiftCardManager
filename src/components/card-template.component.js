import React, { Component } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

export default class GiftCardTemplate extends Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="row" id="PaymentForm">
        <div className="m-4">
          <Cards
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
          />
        </div>

        <form>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Valid Thru</label>
              <input
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group col-md-6">
              <label>CVC</label>
              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary col-md-12">
            Order
          </button>
        </form>
      </div>
    );
  }
}

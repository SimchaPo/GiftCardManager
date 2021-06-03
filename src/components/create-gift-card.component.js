import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Cards from "react-credit-cards";
import GiftCardTemplate from "./card-template.component.js";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import qs from "qs";

export default class CreateGiftCard extends Component {
  constructor(props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      storeName: "",
      cardNumber: "",
      amount: "",
      date: new Date(),
      stores: [],
      expiry: "",
      focus: "",
    };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/stores").then((res) => {
      if (res.data.length > 0) {
        console.log(
          "stores",
          res.data.map((store) => store.storeName)
        );
        this.setState({
          stores: res.data.map((store) => store.storeName),
          storeName: res.data[0].storeName,
        });
      }
    });
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onChangeStoreName = (store) => {
    console.log("store", store);
    this.setState({ storeName: store.value });
  };
  onChangeDate(date) {
    this.setState({
      date: date,
      expiry:
        (date.getMonth() + 1).toString().padStart(2, "0") + date.getFullYear(),
    });
  }
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name === "amount" ? "cvc" : "" });
  };
  onSubmit(e) {
    e.preventDefault();
    const giftCard = {
      storeName: this.state.storeName,
      cardNumber: this.state.cardNumber,
      amount: this.state.amount,
      expiry: this.state.expiry,
    };
    console.log("giftCard", giftCard);
    axios
      .post(
        "http://localhost:5000/giftcards/addgiftcard",
        qs.stringify(giftCard),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => console.log("data after add giftcard", res.data))
      .catch((err) => console.log(err));
    this.setState({
      storeName: "",
      cardNumber: "",
      amount: "",
      expiry: "",
      date: new Date(),
    });
  }
  render() {
    return (
      <div>
        <h3>Create New Gift Card</h3>
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group">
            <SearchList
              name="storeName"
              options={this.state.stores.map((store) => ({
                value: store,
                label: store,
              }))}
              getSelectedOption={this.onChangeStoreName}
              onFocus={this.handleInputFocus}
            />
          </div> */}
          <div className="form-group">
            <label>Card Number:</label>
            <input
              name="cardNumber"
              type="text"
              required
              className="form-control"
              value={this.state.cardNumber}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              name="amount"
              type="text"
              required
              className="form-control"
              value={this.state.amount}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <div>
              <DatePicker
                name="date"
                required
                dateFormat="MM.yyyy"
                showMonthYearPicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                onFocus={this.handleInputFocus}
              />
            </div>
          </div>
          <div id="PaymentForm">
            <Cards
              cvc={this.state.amount}
              expiry={this.state.expiry}
              focused={this.state.focus}
              name={this.state.storeName}
              number={this.state.cardNumber}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Gift Card"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

//export default CreateGiftCard;

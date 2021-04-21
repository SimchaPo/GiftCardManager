import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class CreateGiftCard extends Component {
  constructor(props) {
    super(props);
    this.onChangeStoreName = this.onChangeStoreName.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { storename: "", amount: 0, date: new Date(), users: [] };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        console.log(
          "users",
          res.data.map((user) => user.userName)
        );
        this.setState({
          users: res.data.map((user) => user.userName),
          userName: res.data[0].userName,
        });
      }
    });
  }
  onChangeStoreName(e) {
    this.setState({ storename: e.target.value });
  }
  onChangeAmount(e) {
    this.setState({ amount: e.target.value });
  }
  onChangeDate(date) {
    this.setState({ date: date });
  }
  onSubmit(e) {
    e.preventDefault();
    const giftCard = {
      storename: this.state.storename,
      amount: this.state.amount,
      date: this.state.date,
    };

    console.log(giftCard);
    window.location = "/";
  }
  render() {
    return (
      <div>
        <h3>Create New Gift Card</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Store Name: </label>
            <select
              ref="storeInput"
              required
              className="form-control"
              value={this.state.storename}
              onChange={this.onChangeStoreName}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Amount: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
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

export default CreateGiftCard;

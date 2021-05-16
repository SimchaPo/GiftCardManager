import React, { Component } from "react";
import { CardColumns, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { BsCreditCard } from "react-icons/bs";
import { CartProvider, useCart } from "react-use-cart";
import Cards from "react-credit-cards";

class CardTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: "" };
  }

  render() {
    return (
      <Card style={{ width: "19.5rem" }}>
        <br />
        <Cards
          cvc={this.props.giftCard.amount}
          expiry={this.props.giftCard.expiry}
          name={this.props.giftCard.storeName}
          number={this.props.giftCard.cardNumber}
          focused={this.state.focused}
        />
        <Card.Body>
          <BsCreditCard
            size={100}
            onMouseOver={() => {
              this.setState({ focused: "cvc" });
            }}
          />{" "}
          <BsCreditCard
            size={100}
            onMouseLeave={() => {
              this.setState({ focused: "" });
            }}
          />
          <Card.Title>Gift Card</Card.Title>
          <Card.Text>
            Gift Card's Store: {this.props.giftCard.storeName}
          </Card.Text>
          <Card.Text>
            Gift Card's amount: {this.props.giftCard.amount}
          </Card.Text>
          <Card.Text>
            Gift Card's expiry:{" "}
            {this.props.giftCard.expiry.substring(0, 2) +
              "-" +
              this.props.giftCard.expiry.substr(2)}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
          <button
            className="btn btn-primary"
            onClick={() => this.props.addToCart(this.props.giftCard)}
          >
            Order
          </button>
        </Card.Footer>
      </Card>
    );
  }
}
export default CardTemplate;

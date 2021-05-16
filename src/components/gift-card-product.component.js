import React, { Component } from "react";
import { CardColumns, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { BsCreditCard } from "react-icons/bs";
import { CartProvider, useCart } from "react-use-cart";
import Cards from "react-credit-cards";
import CardTemplate from "./gift-card-product-template.component";

class GiftCardCatalog extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.state = { giftCards: [], cart: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/giftcards")
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            giftCards: res.data,
          });
        }
      })
      .catch((error) => console.log(error));
  }
  addToCart(giftCard) {
    //addItem(giftCard);
    console.log("giftCard", giftCard);
    this.setState({ cart: this.state.cart.concat(giftCard) });
    console.log("cart", this.state.cart);
  }
  GiftCardsList() {
    return this.state.giftCards.map((giftCard) => {
      //console.log(giftCard);
      return (
        <Col key={giftCard._id}>
          <CardTemplate giftCard={giftCard} addToCart={this.addToCart} />
        </Col>
      );
    });
  }
  render() {
    return (
      <div>
        <Row>{this.GiftCardsList()}</Row>
      </div>
    );
  }
}

export default GiftCardCatalog;

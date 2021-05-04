import React, { Component } from "react";
import GiftCardTemplate from "./card-template.component.js";
import "react-credit-cards/es/styles-compiled.css";

class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <GiftCardTemplate />
      </div>
    );
  }
}

export default OrderCard;

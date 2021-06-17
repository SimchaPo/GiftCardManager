import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import CachedIcon from "@material-ui/icons/Cached";
import Cards from "react-credit-cards";

export default function CardTemplate(props) {
  const [focused, setFocused] = useState("");
  return (
    <Card className="m-3" style={{ minWidth: "19.5rem", maxWidth: "19.5rem" }}>
      <br />
      <Cards
        cvc={props.giftCard.amount}
        expiry={props.giftCard.expiry}
        name={props.giftCard.storeName}
        number={props.giftCard.cardNumber}
        focused={focused}
      />
      <div className="text-center">
        <CachedIcon
          style={{ cursor: "pointer" }}
          size={80}
          fontSize="large"
          onClick={() => setFocused(focused === "" ? "cvc" : "")}
        />
      </div>
      <Card.Body>
        <Card.Title>Gift Card</Card.Title>
        <Card.Text>Gift Card's Store: {props.giftCard.storeName}</Card.Text>
        <Card.Text>Gift Card's amount: {props.giftCard.amount}</Card.Text>
        <Card.Text>Gift Card's price: {props.giftCard.price}</Card.Text>
        <Card.Text>
          Gift Card's expiry:{" "}
          {props.giftCard.expiry.substring(0, 2) +
            "-" +
            props.giftCard.expiry.substr(2)}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <button
          className="btn btn-primary"
          onClick={() => props.addToCart(props.giftCard)}
        >
          Order
        </button>
      </Card.Footer>
    </Card>
  );
}

import React from "react";
import { useCart } from "react-use-cart";
import { Col, Row, Button, Badge } from "react-bootstrap";
import Cards from "react-credit-cards";

export function ItemCart(props) {
  const { updateItemQuantity, removeItem } = useCart();
  return (
    <Row>
      <Col>
        <Cards
          cvc={props.item.amount}
          expiry={props.item.expiry}
          name={props.item.storeName}
          number={props.item.cardNumber}
          focused={""}
        />
      </Col>
      <Col>
        <p>Store Name: {props.item.storeName}</p>
        <p>Amount: {props.item.amount}</p>
        <p>Price: {props.item.price}</p>
      </Col>
      <Col>
        <h3>
          <Badge className="m-2" style={{ fontSize: "4.5rem" }} variant="info">
            {props.item.quantity}
          </Badge>
        </h3>
      </Col>
      <Col>
        <Button
          variant="warning"
          onClick={() =>
            updateItemQuantity(props.item.id, props.item.quantity - 1)
          }
        >
          -
        </Button>
        <br />
        <Button
          variant="success"
          onClick={() =>
            updateItemQuantity(props.item.id, props.item.quantity + 1)
          }
        >
          +
        </Button>
        <br />
        <Button variant="danger" onClick={() => removeItem(props.item.id)}>
          &times;
        </Button>
      </Col>
    </Row>
  );
}

import React, { useState, useEffect } from "react";
import { CartProvider, useCart } from "react-use-cart";
import axios from "axios";
import qs from "qs";
import CardTemplate from "./gift-card-product-template.component";
import { Col, Row, Button, Badge, Jumbotron, Container } from "react-bootstrap";
import Cards from "react-credit-cards";

function Page() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/giftcards")
      .then((res) => {
        if (res.data.length > 0) {
          const products = res.data.map((p) => {
            p["id"] = p._id;
            p["price"] = p.amount;
            return p;
          });
          setProducts(products);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Row>
      {products.map((p) => (
        <Col key={p.id}>
          <CardTemplate giftCard={p} addToCart={() => addItem(p)} />
        </Col>
      ))}
    </Row>
  );
}
function ItemCart(props) {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();
  return (
    <Jumbotron fluid>
      <Container>
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
              <Badge
                className="m-2"
                style={{ fontSize: "4.5rem" }}
                variant="info"
              >
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
      </Container>
    </Jumbotron>
  );
}
function checkOut(items, cartTotal) {
  const order = {
    giftCards: items,
    price: cartTotal,
  };
  console.log(order);
  axios
    .post("http://localhost:5000/orders/addorder", qs.stringify(order), {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log("Error", err));
}
function Cart() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
  } = useCart();

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <>
      <h3>Cart</h3>
      <h4>
        Total Unique Items: {totalUniqueItems}, Total Items: {totalItems}, Cart
        Total: {cartTotal}
      </h4>

      {items.map((item) => {
        return <ItemCart key={item.id} item={item} giftCard={item} />;
      })}
      <button
        className="btn btn-primary"
        onClick={() => checkOut(items, cartTotal)}
      >
        Check Out
      </button>
    </>
  );
}

export default function CartCatalog() {
  return (
    <CartProvider>
      <Page />
      <Cart />
    </CartProvider>
  );
}

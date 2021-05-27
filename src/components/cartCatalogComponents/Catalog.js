import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import axios from "axios";
import CardTemplate from "../gift-card-product-template.component";
import { Col, Row } from "react-bootstrap";

export function CatalogPage(props) {
  const { addItem, totalItems } = useCart();

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
  useEffect(() => {
    props.setTotalItems(totalItems);
  }, [totalItems]);
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

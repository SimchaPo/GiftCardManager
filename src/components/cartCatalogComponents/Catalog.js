import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import axios from "axios";
import CardTemplate from "./catalog-item.component";
import { CardGroup } from "react-bootstrap";

export default function CatalogPage(props) {
  const { addItem } = useCart();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios("http://localhost:5000/giftcards")
      .then((res) => {
        if (res.data.length > 0) {
          const products = res.data?.map((p) => {
            p["id"] = p._id;
            return p;
          });
          setProducts(products);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Catalog</h1>
      <CardGroup
        style={{
          justifyContent: "center",
        }}
      >
        {products.map((p) => (
          <CardTemplate key={p.id} giftCard={p} addToCart={() => addItem(p)} />
        ))}
      </CardGroup>
    </div>
  );
}

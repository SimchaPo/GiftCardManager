import React, { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useCart } from "react-use-cart";
import { ItemCart } from "./ItemCart";
import { propTypes } from "react-bootstrap/esm/Image";
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

export default function CartPage(props) {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    addItem,
    updateItemQuantity,
    removeItem,
  } = useCart();
  useEffect(() => {
    props.setTotalItems(totalItems);
  }, [totalItems]);
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

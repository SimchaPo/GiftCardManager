import React from "react";
import axios from "axios";
import qs from "qs";
import { useCart } from "react-use-cart";
import { ItemCart } from "./ItemCart";
import { Table } from "react-bootstrap";
import { useAuth } from "../../authentication/use-auth";
function checkOut(items, cartTotal, emptyCart) {
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
    .then((res) => {
      console.log(res.data);
      emptyCart();
    })
    .catch((err) => console.log("Error", err));
}

export default function CartPage(props) {
  const { isEmpty, totalUniqueItems, items, totalItems, cartTotal, emptyCart } =
    useCart();
  const { user } = useAuth();

  return (
    <div>
      <h3>Cart</h3>
      {(isEmpty && <p>Your cart is empty</p>) || (
        <div>
          <Table striped bordered hover variant="dark" responsive="sm">
            <thead>
              <tr>
                <td>Card</td>
                <td>Turn</td>
                <td>Details</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return <ItemCart key={item.id} item={item} giftCard={item} />;
              })}
            </tbody>
          </Table>
          <Table striped bordered hover variant="dark" responsive="sm">
            <thead>
              <tr>
                <td>Total Unique Items</td>
                <td>Total Items</td>
                <td>Total Price</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalUniqueItems}</td>
                <td>{totalItems}</td>
                <td>{cartTotal}</td>
              </tr>
              <tr>
                <td colSpan={3} className="text-center">
                  {(user && (
                    <button
                      className="btn btn-primary"
                      onClick={() => checkOut(items, cartTotal, emptyCart)}
                    >
                      Check Out
                    </button>
                  )) ||
                    "Need to login in order to complete the shoping"}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

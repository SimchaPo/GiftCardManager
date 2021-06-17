import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { Button, Badge } from "react-bootstrap";
import Cards from "react-credit-cards";
import CachedIcon from "@material-ui/icons/Cached";

export function ItemCart(props) {
  const { updateItemQuantity, removeItem } = useCart();
  const [focused, setFocused] = useState("");
  console.log(props);
  return (
    <tr>
      <td>
        <Cards
          cvc={props.item.amount}
          expiry={props.item.expiry}
          name={props.item.storeName}
          number={props.item.cardNumber}
          focused={focused}
        />
      </td>
      <td className="align-middle text-center">
        <CachedIcon
          style={{ cursor: "pointer" }}
          size={80}
          fontSize="large"
          onClick={() => setFocused(focused === "" ? "cvc" : "")}
        />
      </td>
      <td className="align-middle">
        <p>Store Name: {props.item.storeName}</p>
        <p>Amount: {props.item.amount}</p>
        <p>Price: {props.item.price}</p>
      </td>
      <td className="align-middle text-center">
        <h3>
          <Badge className="m-2" style={{ fontSize: "4.5rem" }} variant="info">
            {props.item.quantity}
          </Badge>
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
        </div>
      </td>
    </tr>
  );
}

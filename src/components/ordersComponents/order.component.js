import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { useAuth } from "../../authentication/use-auth";
import date from "date-and-time";
import { ItemCart } from "../cartCatalogComponents/ItemCart";

import Cards from "react-credit-cards";
import CachedIcon from "@material-ui/icons/Cached";

function OrderItem(props) {
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
            onClick={
              () => {}
              // updateItemQuantity(props.item.id, props.item.quantity - 1)
            }
          >
            -
          </Button>
          <br />
          <Button
            variant="success"
            onClick={
              () => {}
              // updateItemQuantity(props.item.id, props.item.quantity + 1)
            }
          >
            +
          </Button>
          <br />
          <Button
            variant="danger"
            onClick={
              () => {}
              //  removeItem(props.item.id)
            }
          >
            &times;
          </Button>
        </div>
      </td>
    </tr>
  );
}
export default function OrderPage(props) {
  const { user } = useAuth();
  const [orderToUpdate, setOrderToUpdate] = useState();
  const [loading, setLoading] = useState(false);
  const orderId = props.match.params.orderId;
  useEffect(() => {
    setLoading(true);
    console.log("use effect");
    axios
      .get("http://localhost:5000/orders/getorderbyid/" + orderId, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("orderToUpdate", res.data);
        setOrderToUpdate(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(setLoading(false));
  }, [orderId]);
  return (
    <div>
      <h3>Order</h3>
      {(loading && <h5>...loading</h5>) || (
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
            {console.log(loading)}
            {console.log(orderToUpdate)}
            {orderToUpdate?.giftCards.map((item) => {
              console.log(orderToUpdate?.giftCards);
              item.giftCard.quantity = item.quantity;
              return <OrderItem key={item.giftCard._id} item={item.giftCard} />;
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

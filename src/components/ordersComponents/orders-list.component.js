import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAuth } from "../../hooks/use-auth";
import date from "date-and-time";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import { Link } from "react-router-dom";
export default function UsersOrders() {
  const reducer = (a, b) => a + b;
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    axios
      .get("http://localhost:5000/orders/getusersorders/" + user._id, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res);
        if (res.data.length > 0) {
          setOrders(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user._id]);
  return (
    <div>
      <h3>Orders List</h3>
      {orders.length <= 0 && <h5>No Orders To Show</h5>}
      {orders.length > 0 && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Date</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Show</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>
                    {date.format(
                      new Date(order.createdAt),
                      "HH:mm, DD MMM YYYY"
                    )}
                  </td>
                  <td>
                    {order.giftCards
                      .map((gc) => gc.quantity)
                      .reduce(reducer, 0)}
                  </td>
                  <td>{order.price}</td>
                  <td className="text-center">
                    {
                      <Link to={`/order/${order._id}`}>
                        <VisibilityTwoToneIcon style={{ cursor: "pointer" }} />
                      </Link>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAuth } from "../../authentication/use-auth";
import date from "date-and-time";
import { Link } from "react-router-dom";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";

export default function AllOrders() {
  const reducer = (a, b) => a + b;
  const [allOrders, setAllOrders] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    axios
      .get("http://localhost:5000/orders", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("all orders", res.data);
        if (res.data.length > 0) {
          setAllOrders(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h3>Orders List</h3>
      {allOrders.length <= 0 && <h5>No Orders To Show</h5>}
      {allOrders.length > 0 && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Show</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order.user.userName}</td>
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
                      <Link
                        style={{ color: "inherit" }}
                        to={`/order/${order._id}`}
                      >
                        <VisibilityTwoToneIcon />
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

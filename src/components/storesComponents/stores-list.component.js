import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { Link } from "react-router-dom";
function StoreCard(props) {
  console.log(props);
  return (
    <Card className="m-2" style={{ minWidth: "18rem", maxWidth: "18rem" }}>
      <Card.Img
        variant="top"
        src={props.storeLogo}
        style={{ height: "160px" }}
      />
      <Card.Body>
        <Card.Title>{props.storeName}</Card.Title>
        <Card.Text>
          <a
            rel="noopener noreferrer"
            href={props.storeWebsite}
            target="_blank"
          >
            {props.storeWebsite}
          </a>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default function StoresList() {
  const [stores, setStores] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/stores")
      .then((res) => {
        console.log("res", res);
        if (res.data.length > 0) {
          setStores(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h3>Stores List</h3>
      <CardDeck
        style={{
          justifyContent: "center",
        }}
      >
        {stores.map((store) => {
          return <StoreCard key={store._id} {...store} />;
        })}
      </CardDeck>
    </div>
  );
}

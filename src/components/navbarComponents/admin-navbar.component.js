import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <>
      <Nav.Link as={Link} to="/">
        Users
      </Nav.Link>
      <Nav.Link as={Link} to="/createUser">
        Create User
      </Nav.Link>

      <Nav.Link as={Link} to="/orderCard">
        Order Card
      </Nav.Link>
      <Nav.Link as={Link} to="/createStore">
        Create Store
      </Nav.Link>

      <Nav.Link as={Link} to="/createGC">
        Create Gift Card
      </Nav.Link>
    </>
  );
}

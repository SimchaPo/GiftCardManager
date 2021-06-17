import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../authentication/use-auth";
import ROLE from "../../roles.enum";

export default function OrderNav() {
  const { user } = useAuth();
  return (
    (user?.userType === ROLE[0] && (
      <NavDropdown title="Orders" id="collasible-nav-dropdown">
        <NavDropdown.Item eventKey="8" as={Link} to="/allorders">
          All Orders
        </NavDropdown.Item>

        <NavDropdown.Item eventKey="8" as={Link} to="/orders">
          My Orders
        </NavDropdown.Item>
      </NavDropdown>
    )) ||
    (user && (
      <Nav.Link eventKey="9" as={Link} to="/orders">
        Orders
      </Nav.Link>
    ))
  );
}

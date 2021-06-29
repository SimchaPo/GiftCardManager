import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import ROLE from "../../roles.enum";

export default function StoreNav() {
  const { user } = useAuth();
  return (
    (user?.userType === ROLE[0] && (
      <NavDropdown title="Stores" id="collasible-nav-dropdown">
        <NavDropdown.Item eventKey="6" as={Link} to="/stores">
          Stores
        </NavDropdown.Item>

        <NavDropdown.Item eventKey="6" as={Link} to="/createstore">
          Create Store
        </NavDropdown.Item>
      </NavDropdown>
    )) ||
    ((!user || user.userType !== ROLE[0]) && (
      <Nav.Link eventKey="7" as={Link} to="/stores">
        Stores
      </Nav.Link>
    ))
  );
}

import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import ROLE from "../../roles.enum";

export default function CatalogNav() {
  const { user } = useAuth();
  return (
    (user?.userType === ROLE[0] && (
      <NavDropdown title="Catalog" id="collasible-nav-dropdown">
        <NavDropdown.Item eventKey="4" as={Link} to="/catalog">
          Catalog
        </NavDropdown.Item>

        <NavDropdown.Item eventKey="4" as={Link} to="/createGC">
          Create Gift Card
        </NavDropdown.Item>
      </NavDropdown>
    )) ||
    ((!user || user.userType !== ROLE[0]) && (
      <Nav.Link eventKey="5" as={Link} to="/catalog">
        Catalog
      </Nav.Link>
    ))
  );
}

import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import ROLE from "../../roles.enum";

export default function UsersNav() {
  const { user } = useAuth();
  return (
    (user?.userType === ROLE[0] && (
      <NavDropdown title="Users" id="collasible-nav-dropdown">
        <NavDropdown.Item eventKey="12" as={Link} to="/users">
          Users
        </NavDropdown.Item>

        <NavDropdown.Item eventKey="12" as={Link} to="/createuser">
          Create User
        </NavDropdown.Item>
      </NavDropdown>
    )) ||
    (user && user.userType !== ROLE[0] && (
      <Nav.Link eventKey="11" as={Link} to="/users">
        Users
      </Nav.Link>
    ))
  );
}

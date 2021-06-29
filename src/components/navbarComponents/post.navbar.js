import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export default function PostNav() {
  const { user } = useAuth();
  return (
    (user && (
      <NavDropdown title="Posts" id="collasible-nav-dropdown">
        <NavDropdown.Item eventKey="8" as={Link} to="/posts">
          Posts
        </NavDropdown.Item>

        <NavDropdown.Item eventKey="8" as={Link} to="/createpost">
          Create Post
        </NavDropdown.Item>
      </NavDropdown>
    )) ||
    (!user && (
      <Nav.Link eventKey="9" as={Link} to="/posts">
        Posts
      </Nav.Link>
    ))
  );
}

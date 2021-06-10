import { IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { NavDropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../authentication/use-auth";

export default function ProfileNav() {
  const { user, logout } = useAuth();
  return (
    (user && (
      <NavDropdown
        title={
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="primary"
          >
            <AccountCircle />
          </IconButton>
        }
      >
        <NavDropdown.Header>
          <PersonCircle color="royalblue" /> {user.userName}
        </NavDropdown.Header>
        <NavDropdown.Item eventKey="10" as={Link} to="/profile">
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="16" onClick={logout}>
          Log Out
        </NavDropdown.Item>
      </NavDropdown>
    )) ||
    (!user && (
      <NavDropdown
        id="collasible-nav-dropdown"
        title={
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="secondary"
          >
            <AccountCircle />
          </IconButton>
        }
      >
        <NavDropdown.Item eventKey="14" as={Link} to="/signIn">
          Sign In
        </NavDropdown.Item>

        <NavDropdown.Item eventKey="15" as={Link} to="/logIn">
          Log In
        </NavDropdown.Item>
      </NavDropdown>
    ))
  );
}

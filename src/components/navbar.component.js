import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { PersonCircle } from "react-bootstrap-icons";
import { useAuth } from "../authentication/use-auth.js";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

function ProjNavbar(props) {
  //const { user, isAuthenticated } = useContext(UserContext);
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(auth.user);
  return (
    <Navbar className=" navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <Navbar.Brand as={Link} to="/">
        Navbar
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/catalog">
            Catalog
          </Nav.Link>

          {auth.user && auth.user.userType === "admin" && (
            <div>
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
            </div>
          )}
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/cart">
            <Badge color="secondary" badgeContent={props.totalItems}>
              <ShoppingCartIcon />
            </Badge>
          </Nav.Link>
        </Nav>
        {!auth.user ? (
          <Nav>
            <Nav.Link as={Link} to="/logIn">
              Log In
            </Nav.Link>
            <Nav.Link as={Link} to="/signIn">
              Sign In
            </Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link as={Link} to="/profile">
              <PersonCircle color="royalblue" /> {auth.user.userName}
            </Nav.Link>
            <Nav.Link as={Link} to="/logout">
              Log Out
            </Nav.Link>
          </Nav>
        )}
      </div>
      {auth.user && (
        <div>
          <Nav>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="primary"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                <PersonCircle color="royalblue" /> {auth.user.userName}
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/profile">
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  auth.logout();
                  handleClose();
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </Nav>
        </div>
      )}
      {!auth.user && (
        <div>
          <Nav>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="secondary"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/signIn">
                Sign In
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/logIn">
                Log In
              </MenuItem>
            </Menu>
          </Nav>
        </div>
      )}
    </Navbar>
  );
}

export default ProjNavbar;

import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { useCart } from "react-use-cart";
import ProfileNav from "./profile.navbar.js";
import StoreNav from "./store.navbar.js";
import CatalogNav from "./catalog.navbar.js";
import UsersNav from "./users.navbar.js";
import ForumTwoToneIcon from "@material-ui/icons/ForumTwoTone";
import useChat from "../../hooks/useChat.js";
import { useAuth } from "../../authentication/use-auth.js";
import PostNav from "./post.navbar.js";
import OrderNav from "./orders.navbar.js";

function ProjNavbar() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const { countNewMessages } = useChat();
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Gift Cards
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link eventKey="1" as={Link} to="/about">
              About
            </Nav.Link>
            <CatalogNav />
            <StoreNav />
            <PostNav />
            <UsersNav />
            <OrderNav />
          </Nav>
          <Nav className="ms-auto">
            {user && (
              <Nav.Link eventKey="2" as={Link} to="/chat">
                <Badge color="secondary" badgeContent={countNewMessages}>
                  <ForumTwoToneIcon />
                </Badge>
              </Nav.Link>
            )}
            <Nav.Link eventKey="3" as={Link} to="/cart">
              <Badge color="secondary" badgeContent={totalItems}>
                <ShoppingCartIcon />
              </Badge>
            </Nav.Link>
            <ProfileNav />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ProjNavbar;

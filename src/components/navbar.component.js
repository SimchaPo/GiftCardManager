import React, { Component } from "react";
import { Link } from "react-router-dom";
//import auth from "../authentication/auth.js";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    //console.log("loggedIn", this.props.user);
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Navbar
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/catalog" className="nav-link">
                Catalog
              </Link>
            </li>
            {!this.props.isAuthenticated() ? (
              <div>
                <li className="navbar-item">
                  <Link to="/logIn" className="nav-link">
                    Log In
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/signIn" className="nav-link">
                    Sign In
                  </Link>
                </li>
              </div>
            ) : (
              <div>
                {this.props.user.userType === "admin" ? (
                  <div>
                    <li className="navbar-item">
                      <Link to="/" className="nav-link">
                        Users
                      </Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/createUser" className="nav-link">
                        Create User
                      </Link>
                    </li>

                    <li className="navbar-item">
                      <Link to="/orderCard" className="nav-link">
                        Order Card
                      </Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/createStore" className="nav-link">
                        Create Store
                      </Link>
                    </li>

                    <li className="navbar-item">
                      <Link to="/createGC" className="nav-link">
                        Create Gift Card
                      </Link>
                    </li>
                  </div>
                ) : (
                  <div></div>
                )}
                <li className="navbar-item">
                  <Link to="/logout" className="nav-link">
                    Log Out
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;

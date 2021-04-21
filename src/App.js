import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component.js";
import UsersList from "./components/users-list.component.js";
import CreateGiftCard from "./components/create-gift-card.component.js";
import CreateUser from "./components/create-new-user.component.js";
import EditUser from "./components/edit-user.component.js";
import SignIn from "./components/sign-in.component.js";
import Footer from "./components/footer.component.js";
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Footer />
        <br />
        <Route path="/" exact component={UsersList} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/createGC" component={CreateGiftCard} />
        <Route path="/CreateUser" component={CreateUser} />
        <Route path="/edit/:id" component={EditUser} />
      </div>
    </Router>
  );
}

export default App;

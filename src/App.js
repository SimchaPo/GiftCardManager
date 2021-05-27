import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjNavbar from "./components/navbar.component.js";
import UsersList from "./components/usersComponents/users-list.component.js";
import CreateGiftCard from "./components/create-gift-card.component.js";
import EditUser from "./components/usersComponents/edit-user.component.js";
import SignIn from "./components/usersComponents/sign-in.component.js";
import LogIn from "./components/usersComponents/log-in.component.js";
import Logout from "./components/usersComponents/logout.component.js";
import OrderCard from "./components/order-new-card.component.js";
import CreateNewStore from "./components/create-new-store.component.js";
import About from "./components/about.component.js";
import { LoggedinRoute } from "./protectedRoutes/loggedinRoute.js";
import { NotLoggedinRoute } from "./protectedRoutes/notLoggedinRoute.js";
import { AdminRoute } from "./protectedRoutes/adminRoute.js";
import PageNotFound from "./components/404-page.js";
import Profile from "./components/usersComponents/profile.component.js";
import { useAuth } from "./authentication/use-auth.js";

import {
  Cart,
  Catalog,
} from "./components/cartCatalogComponents/CatalogAndCart";
import CreateNewUser from "./components/adminsComponents/add-user.component.js";
function App() {
  const [totalItems, setTotalItems] = useState(
    JSON.parse(window.localStorage.getItem("react-use-cart")).totalItems
  );
  const auth = useAuth();
  console.log(auth);
  return (
    <Router>
      {auth.loading ? (
        <div>loading...</div>
      ) : (
        <div className="container">
          <ProjNavbar {...{ totalItems }} />
          <br />
          <Switch>
            <Route path="/" exact component={UsersList} />
            <NotLoggedinRoute path="/signIn" {...{}} component={SignIn} />
            <NotLoggedinRoute path="/logIn" {...{}} component={LogIn} />
            <LoggedinRoute path="/logout" {...{}} component={Logout} />
            <LoggedinRoute path="/profile" {...{}} component={Profile} />
            <AdminRoute path="/createGC" component={CreateGiftCard} />
            <Route path="/about" component={About} />
            <Route path="/edit/:id" component={EditUser} />
            <Route path="/orderCard" component={OrderCard} />
            <AdminRoute path="/createStore" component={CreateNewStore} />
            {/* <AdminRoute path="/createUser" component={CreateNewUser} /> */}
            <Route path="/createUser" component={CreateNewUser} />
            <Route
              path="/catalog"
              render={() => <Catalog {...{ setTotalItems }} />}
            />
            <Route
              path="/cart"
              render={() => <Cart {...{ setTotalItems }} />}
            />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      )}
    </Router>
  );
}

export default App;

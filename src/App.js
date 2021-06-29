import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjNavbar from "./components/navbarComponents/navbar.component";
import UsersList from "./components/usersComponents/users-list.component.js";
import StoresList from "./components/storesComponents/stores-list.component.js";
import CreateGiftCard from "./components/cartCatalogComponents/create-gift-card.component.js";
import EditUser from "./components/adminsComponents/edit-user.component.js";
import SignIn from "./components/usersComponents/sign-in.component.js";
import LogIn from "./components/usersComponents/log-in.component.js";
import Logout from "./components/usersComponents/logout.component.js";
import CreateNewStore from "./components/storesComponents/create-new-store.component.js";
import About from "./components/about.component.js";
import { LoggedinRoute } from "./protectedRoutes/loggedinRoute.js";
import { NotLoggedinRoute } from "./protectedRoutes/notLoggedinRoute.js";
import { AdminRoute } from "./protectedRoutes/adminRoute.js";
import PageNotFound from "./components/404-page.js";
import Profile from "./components/usersComponents/profile.component.js";
import { useAuth } from "./hooks/use-auth.js";
import ChatRoom from "./components/chatComponents/chat-room.component";
import CreatePost from "./components/blogComponents/create-post.component";
import PostsList from "./components/blogComponents/post-list.component";
import Catalog from "./components/cartCatalogComponents/Catalog";
import Cart from "./components/cartCatalogComponents/Cart";
import CreateNewUser from "./components/adminsComponents/add-user.component.js";
import SinglePost from "./components/blogComponents/single-post.component";
import EditPost from "./components/blogComponents/edit-post.component";
import Loader from "react-loader-spinner";
import useNetwork from "./hooks/useNetwork";
import UsersOrders from "./components/ordersComponents/orders-list.component";
import AllOrders from "./components/adminsComponents/all-orders-list.component";
import OrderPage from "./components/ordersComponents/order.component";
import ProjFooter from "./components/footer.component";

function App() {
  const auth = useAuth();
  const onLine = useNetwork();
  return (
    <Router>
      {(auth.loading && (
        <div className="text-center">
          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
          <h1> loading...</h1>
        </div>
      )) || (
        <div>
          {!onLine && (
            <div className="alert alert-warning text-center" role="alert">
              You are in offline mode
            </div>
          )}
          <ProjNavbar />
          <div className="content container">
            <Switch>
              <Route path="/" exact component={UsersList} />
              <Route path="/users" component={UsersList} />
              <LoggedinRoute path="/createPost" exact component={CreatePost} />
              <Route path="/posts" exact component={PostsList} />
              <Route exact path="/post/:postId" component={SinglePost} />
              <LoggedinRoute
                exact
                path="/editpost/:postId"
                component={EditPost}
              />
              <NotLoggedinRoute path="/signIn" component={SignIn} />
              <NotLoggedinRoute path="/logIn" component={LogIn} />
              <LoggedinRoute path="/logout" component={Logout} />
              <LoggedinRoute path="/profile" component={Profile} />
              <LoggedinRoute path="/chat" component={ChatRoom} />
              <LoggedinRoute path="/orders" component={UsersOrders} />
              <AdminRoute path="/allorders" component={AllOrders} />
              <Route exact path="/order/:orderId" component={OrderPage} />
              <LoggedinRoute
                exact
                path="/chatRoom/:roomId"
                component={ChatRoom}
              />
              <AdminRoute path="/createGC" component={CreateGiftCard} />
              <Route path="/about" component={About} />
              <Route path="/stores" component={StoresList} />
              <Route path="/edit/:id" component={EditUser} />
              <AdminRoute path="/createStore" component={CreateNewStore} />
              {/* <AdminRoute path="/createUser" component={CreateNewUser} /> */}
              <Route path="/createUser" component={CreateNewUser} />
              <Route path="/catalog" render={() => <Catalog />} />
              <Route path="/cart" render={() => <Cart />} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </div>
          <ProjFooter />
        </div>
      )}
    </Router>
  );
}

export default App;

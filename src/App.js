import './App.css';
import Header from "./component/layout/Header/Header"

import WebFont from "webfontloader"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React, {useState, useEffect} from 'react';
import Footer from "./component/layout/Footer/Footer"
import Home from "./component/Home/Home"
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';

import store from "./store"
import {loadUser} from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import {useSelector} from 'react-redux';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import Protected from './component/Protected';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';

import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';

function App() {
  const {isAuthenticated, user}=useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey]=useState("");
  async function getStripeApiKey() {
    const {data}=await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      },
    });
    store.dispatch(loadUser())
    getStripeApiKey();
  }, [])
  return (
    <Router>
      <Header />
      {isAuthenticated&&<UserOptions user={user} />}
      <Routes>
        <Route exact path="/" Component={Home}></Route>
        <Route exact path="/product/:id" element={<ProductDetails/>}></Route>
        <Route exact path="/products" element={<Products/>}></Route>
        <Route path="/products/:keyword" element={<Products />}></Route>
        <Route exact path="/search" element={<Search/>}></Route>
        <Route exact path="/login" element={<LoginSignUp/>}></Route>
        <Route exact path="/password/forgot" element={<ForgotPassword/>}></Route>
        <Route exact path="/password/reset/:token" element={<ResetPassword/>}></Route>
        <Route exact path="/cart" element={<Cart/>}></Route>
        { /*protected route starts*/}
        <Route element={<ProtectedRoute />}>
          <Route element={<Protected isAuthenticated={isAuthenticated} />}>
            <Route exact path="/account" element={<Profile/>}></Route>
            <Route exact path="/me/update" element={<UpdateProfile/>}></Route>
            <Route exact path="/password/update" element={<UpdatePassword/>}></Route>
            <Route exact path="/login/shipping" element={<Shipping/>}></Route>
            <Route exact path="/order/confirm" element={<ConfirmOrder/>}></Route>
            {stripeApiKey && <Route exact path="/process/payment" element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }></Route>}
            <Route exact path="/success" element={<OrderSuccess />} />
            <Route exact path="/orders" element={<MyOrders/>}></Route>
            <Route exact path="/order/:id" element={<OrderDetails/>}></Route>
            <Route exact path="/admin/dashboard" element={<Dashboard/>}></Route>
            <Route exact path="/admin/products" element={<ProductList />}></Route>
            <Route exact path="/admin/product" element={<NewProduct/>}></Route>
            <Route exact path="/admin/product/:id" element={<UpdateProduct/>}></Route>
            <Route exact path="/admin/orders" element={<OrderList/>}></Route>
            <Route exact path="/admin/order/:id" element={<ProcessOrder/>}></Route>
            <Route exact path="/admin/users" element={<UsersList/>}></Route>
            <Route exact path="/admin/user/:id" element={<UpdateUser/>}></Route>
            <Route exact path="/admin/reviews" element={<ProductReviews/>}></Route>
          </Route>
        </Route>
        {/*protected route ends here*/}

      </Routes>
      <Footer />
    </Router>
  );
}



export default App;

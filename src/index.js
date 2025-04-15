import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import SellerDashboard from "./pages/SellerDashboard";
import ManageProducts from "./pages/ManageProducts";
import ViewOrders from "./pages/ViewOrders";
import AccountSettings from "./pages/AccountSettings";
import Confirmation from "./pages/Confirmation";
import SearchResults from "./pages/SearchResults";
import ProductDetails from "./pages/ProductDetails";
// import Return from "./pages/Return";

import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  Return,
} from "./pages";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
         
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product/*" element={<PageNotFound />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/view-orders" element={<ViewOrders />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product-details" element={<ProductDetails />} />

          <Route path="/return" element={<Return />} />
        
        </Routes>
      </Provider>
    </ScrollToTop>
    <Toaster />
  </BrowserRouter>
);

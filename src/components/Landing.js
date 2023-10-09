import React, { useState } from "react";
import { NavBar } from "./Navigation Bar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import ProductsList from "./Products/ProductList";
import ProductDetails from "./Products/ProductDetails";
import CreateOrder from "./Create Order/CreateOrder";

export const Landing = () => {  
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/product/:id/orderdetails" element={<CreateOrder />}/>
      </Routes>
    </BrowserRouter>
  );
};
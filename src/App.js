import {Routes, Route} from "react-router-dom"
import React from "react";
import Home from "./Pages/Home/Home"
import "./App.css"
import ProductPage from "./Pages/ProductPage/ProductPage";
import Header from "./Pages/Home/components/Header";
import CartPage from "./Pages/CartPage/CartPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {
  return (
      <div className="app">

          <Header/>

          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/profile/:userId" element={<ProfilePage/>}/>
              <Route path="cart" element={<CartPage/>}/>
              <Route path="product/:id" element={<ProductPage/>}/>
          </Routes>
      </div>
  );
}

export default App;

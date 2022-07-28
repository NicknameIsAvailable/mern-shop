import {Routes, Route} from "react-router-dom"
import React from "react";
import Home from "./Pages/Home/Home.jsx"
import "./App.css"
import ProductPage from "./Pages/ProductPage/ProductPage.jsx";
import Header from "./Pages/Home/components/Header/Header.jsx"
import CartPage from "./Pages/CartPage/CartPage.jsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";

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

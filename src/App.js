import {Routes, Route} from "react-router-dom"
import React from "react";
import Home from "./Pages/Home/Home"
import "./App.css"
import ProductPage from "./Pages/ProductPage/ProductPage";
import Header from "./Pages/Home/components/Header";
import CartPage from "./Pages/CartPage/CartPage";

function App() {
  return (
      <div className="app">

          <Header/>

          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="cart" element={<CartPage/>}/>
              <Route path="product/:id" element={<ProductPage/>}/>
          </Routes>
      </div>
  );
}

export default App;

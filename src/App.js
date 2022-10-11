import {Routes, Route, Navigate} from "react-router-dom"
import React, {useEffect, useState} from "react";
import Home from "./Pages/Home/Home.jsx"
import "./App.css"
import ProductPage from "./Pages/ProductPage/ProductPage.jsx";
import Header from "./Pages/Home/components/Header/Header.jsx"
import CartPage from "./Pages/CartPage/CartPage.jsx";
import Registration from "./Pages/Registration/Registration.jsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectIsAdmin, selectIsAuth} from "./Redux/Slices/auth.js";
import Login from "./Pages/Login/Login.jsx";
import Order from "./Pages/Order/Order.jsx";
import Error from "./Pages/Error/Error.jsx";
import AdminPanel from "./Pages/AdminPanel/AdminPanel.jsx";
import axios from "./axios.js";

function App() {

    return (
        <div className="app">

            <Header/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<Error/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/profile/registration" element={<Registration/>}/>
                <Route path="/admin" element={<AdminPanel/>}/>
                <Route path="/profile/login" element={<Login/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/orders/:id" element={<Order/>}/>
                <Route path="/product/:id" element={<ProductPage/>}/>
            </Routes>
        </div>
    );
}

export default App;

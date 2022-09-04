import {Routes, Route} from "react-router-dom"
import React from "react";
import Home from "./Pages/Home/Home.jsx"
import "./App.css"
import ProductPage from "./Pages/ProductPage/ProductPage.jsx";
import Header from "./Pages/Home/components/Header/Header.jsx"
import CartPage from "./Pages/CartPage/CartPage.jsx";
import Registration from "./Pages/Registration/Registration.jsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";
import {useDispatch} from "react-redux";
import {fetchAuthMe} from "./Redux/Slices/auth.js";

function App() {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(fetchAuthMe())
    }, [dispatch])

    return (
        <div className="app">

            <Header/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile/:userId" element={<ProfilePage/>}/>
                <Route path="/profile/registration" element={<Registration/>}/>
                <Route path="cart" element={<CartPage/>}/>
                <Route path="product/:id" element={<ProductPage/>}/>
            </Routes>
        </div>
    );
}

export default App;

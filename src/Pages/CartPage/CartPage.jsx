import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material"
import Product from "./Components/Product/Product.jsx";
import axios from "../../axios.js";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../Redux/Slices/auth.js";
import {Navigate} from "react-router-dom";

const CartPage = () => {
    const isAuth = useSelector(selectIsAuth)
    const [cart, setCart] = useState()
    const [isLoading, setIsLoading] = useState(true);
    useSelector((state) => state.auth.data);
    useEffect(() => {
        axios.get('/users/cart').then((res) => {
            setCart(res.data)
            setIsLoading(false)
        })
            .catch(err => {
                console.warn(err)
                alert('Ошибка при получении корзины')
            })
    }, []);

    console.log(cart)

    if (isAuth) {

        return (
            <Container className="cartPage">
                <h1>Корзина</h1>

                {(isLoading ? [...Array(5)] : cart).map((product) =>
                    isLoading ? (
                        <Product
                            title='Загрузка'
                        />
                    ) : (
                        <Product title={product.title}
                                 images={product.images}
                                 description={product.description}
                                _id={product._id}
                        />
                    ))}
            </Container>
        )
    } else {
        alert("Войдите в аккаунт")
        return (
            <Navigate to={"/cartError"} message={"войдите в аккаунт, чтобы пользоваться корзиной"}/>
        )
    }



    //TODO сделать отображение товаров в корзине


};

export default CartPage;

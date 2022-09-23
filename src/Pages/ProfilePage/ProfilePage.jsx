import React, {useEffect, useState} from 'react';
import {Button, Card, Container} from "@mui/material";
import axios from "../../axios.js";
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../Redux/Slices/auth.js";
import {fetchGetUserOrders} from "../../Redux/Slices/orders.js";

const ProfilePage = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const [data, setData] = useState()
    const [isLoading, setIsLoading,] = useState();
    const userData = useSelector((state) => state.auth.data)
    fetchGetUserOrders(userData._id)

    //TODO Сделать адекватное отображение заказов
    //TODO Сделать страницу заказа

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        axios.get(`/users/${userData._id}`)
    })

    const ordersList = userData.orders.map(order =>
        <Link to={`/orders/${order}`}>
            <Card style={{padding: "16px", margin: "16px 0"}} className="order">
                {order}
            </Card>
        </Link>
    )

    const onCLickLogout = () => {
        if (window.confirm('Вы действительно хотите выйти из аккаунта?')) {
            dispatch(logout())
            window.localStorage.removeItem('token')
            return <Navigate to="/"/>
        }
    }

    if (isAuth) {
        return (
            <Container className="profilePage">
                <h1>Профиль</h1>
                <h3>{userData.name} {userData.surname}</h3>
                <h3>Почта: {userData.email}</h3>
                <h3>Номер телефона: {userData.mobilePhone}</h3>
                <p>Пользовательский ID: {userData._id}</p>

                <h1>Заказы</h1>
                {ordersList}
                <Button variant="outlined" color="error" onClick={() => {onCLickLogout()}}>Выйти из аккаунта</Button>
            </Container>
        );
    } else {
        return <Navigate to="/profile/registration"/>
    }
};

export default ProfilePage;

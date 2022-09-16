import React, {useEffect, useState} from 'react';
import {Button, Container} from "@mui/material";
import axios from "../../axios.js";
import {Navigate} from "react-router-dom";
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

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        axios.get(`/users/${userData._id}`)
    })

    const ordersList = userData.orders.map(order =>
        <div className="order">
            {order}
        </div>
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
                <p>{userData.name} {userData.surname}</p>
                <p>Почта: {userData.email}</p>
                <p>Номер телефона: {userData.mobilePhone}</p>
                <p>адрес: {userData.country} {userData.city} {userData.street} дом {userData.house} {userData.building} квартира {userData.flat} почтовый индекс {userData.postalCode}</p>
                <p>Пользовательский ID: {userData._id}</p>
                <p>Роль: {userData.role}</p>

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

import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Divider, List} from "@mui/material";
import axios from "../../axios.js";
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../Redux/Slices/auth.js";

const ProfilePage = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.data)
    const [orders, setOrders] = useState();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        axios.get(`/users/${userData._id}`)
        axios.get('/users/orders/').then((res) => {
            setOrders(res.data);
            setIsLoading(false);
        })
            .catch(err => {
                console.warn(err);
                alert('Ошибка при получении заказов');
            })
    }, [])

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
                {(isLoading ? [...Array(5)] : orders).map((order) =>
                    isLoading ? (
                        <Card style={{padding: "16px", margin: "16px 0"}} className="order">
                            <h3>Загрузка</h3>
                        </Card>
                    ) : (
                        <Card style={{padding: "16px", margin: "16px 0"}} className="order">
                            <h3>Заказ #{order._id}</h3>
                            <List>
                            {order.products.map((product) =>
                                <>
                                    <Link to={`/product/${product._id}`}>
                                        <img src={product.images} alt={product.title} width="200" />
                                        <h3>{product.title}</h3>
                                        <p>{product.description}</p>
                                        <h4>{product.price}P</h4>
                                    </Link>
                                    <Divider/>
                                </>
                            )}
                            </List>
                        </Card>
                    ))}
                <Button variant="outlined" color="error" onClick={() => {onCLickLogout()}}>Выйти из аккаунта</Button>
            </Container>
        );
    } else {
        return <Navigate to="/profile/registration"/>
    }
};

export default ProfilePage;

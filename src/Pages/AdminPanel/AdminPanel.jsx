import React, {useEffect, useState} from 'react';
import {Card, Container, List, ListItem, ListItemText, Divider, Button} from "@mui/material";
import axios from "../../axios.js";
import ProductCard from "../Home/components/ProductCard/ProductCard.jsx";
import {selectIsAuth} from "../../Redux/Slices/auth.js";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const AdminPanel = () => {

    // TODO Доделать админ панель

    const [products, setProducts] = useState();
    const [users, setUsers] = useState();
    const isAuth = selectIsAuth;
    const [isLoading, setIsLoading] = useState(true);
    const [productsVisible, setProductsVisible] = useState();
    const [usersVisible, setUsersVisible] = useState();
    const userData = useSelector((state) => state.auth.data);

    useEffect(() => {
        axios.get('/products').then((res) => {
            setProducts(res.data)
            setIsLoading(false)
        });

        axios.get('/users').then((res) => {
            setUsers(res.data)
            setIsLoading(false)
        });
    })

    if (!isAuth) {
        <Navigate to="/"/>
    }

    const showProducts = () => {
        if (!productsVisible) {
            setProductsVisible(true)
        } else {
            setProductsVisible(false)
        }
    }

    const showUsers = () => {
        if (!usersVisible) {
            setUsersVisible(true)
        } else {
            setUsersVisible(false)
        }
    }
    return (
        <Container className="AdminPanel">
            Это админ панель


            <Card className="dashboard">

            </Card>

            <Card>
                <Button onClick={() => showProducts()}>Продукты ({products?.length})</Button>
                <List style={productsVisible ? {display: 'block'} : {display: 'none'}}>
                    {(isLoading ? [...Array(5)] : products).map((product) =>
                        isLoading ? (
                            <>
                                <ListItem>
                                    <ListItemText primary="Загрузка"/>
                                </ListItem>
                                <Divider light />
                            </>
                    ) : (
                            <>
                                <ListItem>
                                    <ListItemText primary={product.title + " #" + product._id}/>
                                </ListItem>
                                <Divider light />
                            </>
                        ))}
                </List>
            </Card>

            <Card>
                <Button onClick={() => showUsers()}>Юзеры ({users?.length})</Button>
                <List style={usersVisible ? {display: 'block'} : {display: 'none'}}>
                    {(isLoading ? [...Array(5)] : users).map((user) =>
                        isLoading ? (
                            <>
                                <ListItem>
                                    <ListItemText primary="Загрузка"/>
                                </ListItem>
                                <Divider light />
                            </>
                        ) : (
                            <>
                                <ListItem>
                                    <ListItemText primary={user.name + "" + user.surname + " #" + user._id}/>
                                </ListItem>
                                <Divider light />
                            </>
                        ))}
                </List>
            </Card>
        </Container>
    )
};

export default AdminPanel;

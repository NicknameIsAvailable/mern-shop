import React, {useEffect, useState} from 'react';
import {Card, Container} from "@mui/material";
import axios from "../../axios.js";
import {Link, Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../Redux/Slices/auth.js";

const Order = () => {
    const isAuth = useSelector(selectIsAuth)
    const {id} = useParams()

    const [data, setData] = useState()
    const [isLoading, setIsLoading,] = useState();

    useEffect(() => {
        axios.get(`/orders/${id}`).then((res) => {
            setData(res.data)
            setIsLoading(false)
        })
            .catch(err => {
                console.warn(err)
                alert('Ошибка при получении продукта')
            })
    }, [])

    if (!isAuth) {
        return (
            <Navigate to={"/Error"}/>
        )
    }

    if (isLoading) {
        <Container>
            <h1>Загрузка...</h1>
        </Container>
    }

    console.log(data)

    const productsList = data.products(product => {
        <Card>
            <h1>{product.title}</h1>
        </Card>
    })

    return (
        <Container className="ProductList">
            <h1>{data._id}</h1>

        </Container>
    )
};

export default Order;

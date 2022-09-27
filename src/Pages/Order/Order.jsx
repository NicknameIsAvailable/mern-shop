import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";
import axios from "../../axios.js";
import {Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../Redux/Slices/auth.js";
import ProductCard from "../Home/components/ProductCard/ProductCard.jsx";

const Order = () => {
    const isAuth = useSelector(selectIsAuth)
    const {id} = useParams()

    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`/orders/${id}`).then((res) => {
            setData(res.data)
            setIsLoading(false)
        })
            .catch(err => {
                console.warn(err)
                alert('Ошибка при получении продуктов')
            })
    }, [])

    if (!isAuth) {
        return (
            <Navigate to={"/Error"}/>
        )
    }

    if (isLoading) {
        return (
            <Container>
                <h1>Загрузка...</h1>
            </Container>
        )
    }
    return (
        <Container className="ProductList">
            {(isLoading ? [...Array(5)] : data).map((product) =>
                isLoading ? (
                    <ProductCard
                        title={'Загрузка'}
                    />
                ) : (
                    <ProductCard
                        id={product._id}
                        title={product.title}
                        price={product.price}
                        images={product.images}
                        description={product.description}/>
                ))}
        </Container>
    )
};

export default Order;

import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material"
import {useParams} from "react-router-dom";
import CartButton from "../../Components/CartButton.jsx";
import axios from "../../axios.js";

const ProductPage = () => {
//TODO: получение продукта
    const {id} = useParams()

    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`/products/${id}`).then((res) => {
            setData(res.data)
            setIsLoading(false)
        })
            .catch(err => {
                console.warn(err)
                alert('Ошибка при получении продукта')
            })
    }, [])

    console.log(data)

    return (
        <Container className="productPage">

            {isLoading ?
                <h1>Загрузка...</h1>
                :
                <>
                <h1>{data.title}</h1>
                <img src={data.images} alt={data} width="480"/>
                <p>{data.description}</p>
                <CartButton price={data.price}/>
                </>
            }
        </Container>
    );
};

export default ProductPage;

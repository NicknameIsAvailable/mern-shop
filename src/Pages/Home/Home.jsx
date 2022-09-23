import React, {useEffect, useState} from 'react';
import {Container} from '@mui/material';
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import "./Home.css"
import axios from "../../axios";

const Home = () => {
    //TODO вспомнить какую еще хуйню ты забыл

    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`/products`).then((res) => {
            setData(res.data)
            setIsLoading(false)
        })
            .catch(err => {
                console.warn(err)
                alert('Ошибка при получении продуктов')
            })
    }, [])

    // console.log(data)

    return (
        <div className="home">
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
        </div>
    );
};

export default Home;

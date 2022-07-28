import React from 'react';
import Header from "./components/Header/Header.jsx"
import {Button, Card, Container} from '@mui/material';
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import productArr from "../../Components/productArr.js";
import "./Home.css"

const Home = () => {

    const productList = productArr.map((product) =>
        <ProductCard
            id={product.id}
            title={product.title}
            price={product.price}
            imageUrl={product.imageUrl}
            description={product.description}/>
    )

    return (
        <div className="home">
            <Container className="ProductList">
                {productList}
            </Container>
        </div>
    );
};

export default Home;

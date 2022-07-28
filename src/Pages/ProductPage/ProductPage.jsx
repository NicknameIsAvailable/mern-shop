import React from 'react';
import {Button, Container} from "@mui/material"
import {useParams} from "react-router-dom";
import productArr from "../../Components/productArr.js"
import CartButton from "../../Components/CartButton.jsx";

const ProductPage = () => {

    const {id} = useParams()

    const product = productArr.find(product => product.id === id)

    return (
        <Container className="productPage">
            <h1>{product.title}</h1>
            <img src={product.imageUrl} alt={product} width="480"/>
            <p>{product.description}</p>
            <CartButton price={product.price}/>
        </Container>
    );
};

export default ProductPage;

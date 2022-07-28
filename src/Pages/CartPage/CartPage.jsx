import React from 'react';
import {Card, Container} from "@mui/material"
import productArr from "../../Components/productArr"
import Product from "./Components/Product/Product";

const CartPage = () => {

    const productsList = productArr.map((product) =>
        <Product title={product.title}
                 imageUrl={product.imageUrl}
                 description={product.description}/>
    )

    return (
        <Container className="cartPage">
            <h1>Корзина</h1>
            {productsList}
        </Container>
    );
};

export default CartPage;

import React from 'react';
import {Container} from "@mui/material"
import productArr from "../../Components/productArr.js"
import Product from "./Components/Product/Product.jsx";

const CartPage = () => {

    const productsList = productArr.map((product) =>
        <Product title={product.title}
                 imageUrl={product.imageUrl}
                 description={product.description}/>
    )

    //TODO сделать отображение товаров в корзине

    return (
        <Container className="cartPage">
            <h1>Корзина</h1>
            {productsList}
        </Container>
    );
};

export default CartPage;

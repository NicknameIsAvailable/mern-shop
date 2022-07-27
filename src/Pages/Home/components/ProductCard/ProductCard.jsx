import React from 'react';
import "./ProductCard.css"
import {Card, Button} from '@mui/material'
import {Link} from "react-router-dom"
import CartButton from "../../../../Components/CartButton";

const ProductCard = (props) => {

    const id = props.id

    return (
        <Card className="ProductCard">
            <img src={props.imageUrl} width="300" alt="картинка"/>
            <Link to={`/product/${id}`}>
            <h1>{props.title}</h1>
            </Link>
            <p>{props.description}</p>
            <CartButton price={props.price}/>
        </Card>
    );
};

export default ProductCard;

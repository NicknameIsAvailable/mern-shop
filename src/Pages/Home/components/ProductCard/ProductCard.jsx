import React from 'react';
import "./ProductCard.css"
import {Card} from '@mui/material'
import {Link} from "react-router-dom"
import CartButton from "../../../../Components/CartButton.jsx";

const ProductCard = (props) => {
    return (
        <Card className="ProductCard">
            <img src={props.imageUrl} width="300" alt="картинка"/>
            <Link to={`/product/${props.id}`}>
            <h1>{props.title}</h1>
            </Link>
            <p>{props.description}</p>
            <CartButton price={props.price} id={props.id}/>
        </Card>
    );
};

export default ProductCard;

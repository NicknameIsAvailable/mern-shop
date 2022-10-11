import React from 'react';
import "./ProductCard.css"
import {Card} from '@mui/material'
import {Link} from "react-router-dom"
import CartButton from "../../../../Components/CartButton.jsx";
import axios from "../../../../axios.js";

const ProductCard = (props) => {
    const addCart = async (id) => {
        await axios.post(`/users/cart/${id}`)
        console.log('Функция сработала')
    }

    return (
        <Card className="ProductCard">
            <img src={props.images} width="300" alt="картинка"/>
            <Link to={`/product/${props.id}`}>
            <h1>{props.title}</h1>
            </Link>
            <h3>#{props.id}</h3>
            <p>{props.description}</p>
            <CartButton onClick={addCart(props.id)} price={props.price} id={props.id}/>
        </Card>
    );
};

export default ProductCard;

import React from 'react';
import "./ProductCard.css"
import {Card} from '@mui/material'
import {Link} from "react-router-dom"
import CartButton from "../../../../Components/CartButton.jsx";

const ProductCard = ({id, title, images, tags, price, count, isLoading}) => {
    return (
        <Card className="ProductCard">
            {(isLoading ? (
                <>
                    <div width="300" height="300"/>
                        <h1>Загрузка</h1>
                    <p></p>
                    <p></p>
                    <CartButton price="????" disabled={true} />
                </>
            ) : (
                <>
                    <img src={images} width="300" alt="картинка"/>
                    <Link to={`/product/${id}`}>
                        <h1>{title}</h1>
                    </Link>
                    <p>{tags}</p>
                    <p>Осталось {count}</p>
                    <CartButton price={price} id={id}/>
                </>
                ))}
        </Card>
    )
};

export default ProductCard;

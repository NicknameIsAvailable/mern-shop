import React, {useState} from 'react';
import {Card, Button, ButtonGroup} from "@mui/material";
import "./Product.css"
import {Link} from "react-router-dom";

const Product = (props) => {

    const [productCount, setProductCount] = useState(1)
    const [deleteProduct, setDeleteProduct] = useState(false)

    return (
        <Card className="product">
            <img src={props.images} alt={props._id} width={200}/>
            <div>
                <Link to={`/product/${props._id}`}>
                    <h1>{props.title}</h1>
                </Link>
                <p>{props.description}</p>

                <ButtonGroup className="ButtonGroup" variant="outlined" aria-label="outlined primary button group">
                    <Button onClick={() => setProductCount(productCount - 1)}>-</Button>
                    <Button>{productCount}</Button>
                    <Button onClick={() => setProductCount(productCount + 1)}>+</Button>
                </ButtonGroup>

                <Button
                    color="error"
                    className="deleteButton"
                    variant={deleteProduct ? "contained" : "outlined"}
                    onClick={() => setDeleteProduct(true)}
                >Удалить</Button>
            </div>
        </Card>
    );
};

export default Product;

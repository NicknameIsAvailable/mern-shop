import React, {useState} from 'react';
import {Card, Button, ButtonGroup} from "@mui/material";
import "./Product.css"

const Product = (props) => {

    const [productCount, setProductCount] = useState(1)
    const [deleteProduct, setDeleteProduct] = useState(false)

    return (
        <Card className="product">
            <img src={props.imageUrl} alt={props.title} width={200}/>
            <div>
                <h1>{props.title}</h1>
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

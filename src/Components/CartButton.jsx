import React, {useState} from 'react';
import {Button} from "@mui/material";
import {cart} from "./cart";

const CartButton = (props) => {
    const [productAdded, setProductAdded] = useState(0)

    const id = props.id

    const cartAdd = () => {
        setProductAdded(productAdded + 1)
        cart.add(id.toString())
        console.log(cart)
    }

    return (
        <Button onClick={cartAdd}
                variant={productAdded ? "outlined" : "contained" }
                color="success">
            {productAdded !== 0 ?
                `Добавлено в корзину ${productAdded}`
                :
                `${props.price}Р Добавить в корзину`
            }
        </Button>
    );
};

export default CartButton;

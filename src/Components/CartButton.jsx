import React from 'react';
import {Button} from "@mui/material";

const CartButton = (props) => {

    return (
        <Button variant="contained" color="success">{props.price}Р Добавить в корзину</Button>
    );
};

export default CartButton;

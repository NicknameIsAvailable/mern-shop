import React, {useState} from 'react';
import "./Header.css"
import {Button, Container, TextField} from '@mui/material';
import {Link} from "react-router-dom"
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../../../Redux/Slices/auth.js";

const Header = () => {
    const isAuth = useSelector(selectIsAuth)
    return (
        <header>
                <Container>
                <Link to="/">
                <Button className="icons">
                    <EmojiFoodBeverageIcon/>
                </Button>
                </Link>

                <Link to={`/profile/registration`}>
                <Button className="icons">
                    <AccountBoxIcon/>
                </Button>
                </Link>

                <Link to="/cart">
                    <Button disabled={!isAuth} className="icons">
                        <ShoppingCartIcon/>
                    </Button>
                </Link>

                <div className="search">
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                </div>
                </Container>
            </header>
    );
};

export default Header;

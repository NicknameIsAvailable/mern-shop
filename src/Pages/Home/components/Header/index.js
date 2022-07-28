import React from 'react';
import "./styles.css"
import { Container, TextField } from '@mui/material';
import {Link} from "react-router-dom"
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const userId = "1yZDGDovrkrGdMJl"

const Header = () => {
    return (
        <header>
            <Container>
                <Link to="/">
                <div className="icons">
                    <EmojiFoodBeverageIcon/>
                </div>
                </Link>

                <Link to={`/profile/${userId}`}>
                <div className="icons">
                    <AccountBoxIcon/>
                </div>
                </Link>

                <Link to="/cart">
                    <div className="icons">
                        <ShoppingCartIcon/>
                    </div>
                </Link>

                <div className="search">
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                </div>

            </Container>
        </header>
    );
};

export default Header;

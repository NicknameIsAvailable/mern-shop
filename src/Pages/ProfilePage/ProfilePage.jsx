import React from 'react';
import {Button, Container} from "@mui/material";
import {Navigate} from "react-router-dom";

const ProfilePage = () => {

    const isAuth = false

    if (!isAuth) {
        return (<Navigate to="/profile/registration"/>)
    }

    return (
        <Container className="profilePage">
                <h1>Профиль</h1>
                <h3>длфывжоа</h3>
                <p>фыва</p>
                <Button variant="outlined" color="error">Выйти из аккаунта</Button>
        </Container>
    );
};

export default ProfilePage;

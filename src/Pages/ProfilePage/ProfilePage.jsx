import React from 'react';
import {Container, Avatar, Button} from '@mui/material';
import {users} from "../../Components/user.js";
import {userId} from "../Home/components/Header/Header.jsx";
import "./ProfilePage.css"

const ProfilePage = () => {

    const profileData = users.find(user => user.id === userId)

    return (
        <Container className="profilePage">
            <h1>Профиль</h1>

            <Avatar alt={profileData.name} src={profileData.imageUrl} />
            <h3>{profileData.name} {profileData.surname}</h3>
            <p>#{profileData.id}</p>

            <Button variant="outlined" color="error">Выйти из аккаунта</Button>
        </Container>
    );
};

export default ProfilePage;

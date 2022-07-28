import React from 'react';
import {Container, Avatar} from '@mui/material';
import {users} from "../../Components/user";
import {userId} from "../Home/components/Header";

const ProfilePage = () => {

    const profileData = users.find(user => user.id === userId)

    return (
        <Container className="profilePage">
            <h1>Профиль</h1>

            <Avatar alt={profileData.name} src={profileData.imageUrl} />
            <h3>{profileData.name} {profileData.surname}</h3>
            <p>#{profileData.id}</p>
        </Container>
    );
};

export default ProfilePage;

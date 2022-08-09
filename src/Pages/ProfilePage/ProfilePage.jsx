import React from 'react';
import {Container, Avatar, Button, TextField, Box, Checkbox, FormControlLabel} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {users} from "../../Components/user.js";
import {userId} from "../Home/components/Header/Header.jsx";
import "./ProfilePage.css"
import {useState} from "react";

const ProfilePage = () => {

    const profileData = users.find(user => user.id === userId)

    const [isLogged, setIsLogged] = useState(false)

    return (
            isLogged ?
            <Container className="profilePage">
                <h1>Профиль</h1>
                 <Avatar alt={profileData.name} src={profileData.imageUrl}/>
                <h3>{profileData.name} {profileData.surname}</h3>
                <p>#{profileData.id}</p>
                 <Button variant="outlined" color="error">Выйти из аккаунта</Button>
            </Container>
             :
            <Container className="profilePage" sx={{width: '360px'}}>
                   <h1>Профиль</h1>
                <form>
                <Avatar alt={profileData.name} src={profileData.imageUrl}/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { width: '25ch' },
                    }}
                >
                    <TextField style={{width: "310px"}} required id="standard-basic" label="Имя" variant="standard" />
                    <TextField style={{width: "310px"}} required id="standard-basic" label="Фамилия" variant="standard" />
                    <TextField style={{width: "310px"}} required id="standard-basic" label="Электронная почта" variant="standard" />
                    <TextField
                        style={{width: "310px"}}
                        required
                        id="outlined-password-input"
                        label="Пароль"
                        variant="standard"
                        type="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        style={{width: "310px"}}
                        required
                        id="outlined-password-input"
                        label="Повторите пароль"
                        variant="standard"
                        type="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        style={{width: "310px"}}
                        id="filled-number"
                        label="Номер телефона"
                        type="standard"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                    />
                </Box>

                <Box
                    sx={{
                        marginTop: "24px",
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { width: '25ch' },
                    }}
                >

                    <h3>Адрес</h3>
                    <TextField style={{width: "310px"}} required id="standard-basic" label="Страна" variant="standard" />
                    <TextField style={{width: "310px"}} required id="standard-basic" label="Город" variant="standard" />
                    <TextField style={{width: "310px"}} required id="standard-basic" label="Улица" variant="standard" />
                    <TextField style={{width: "310px"}} required id="standard-basic" label="Дом корпус" variant="standard" />
                    <TextField style={{width: "310px"}} required id="standard-basic" label="квартира" variant="standard" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Вы живете в частном доме?" />

                    <Button variant="contained" type="submit" endIcon={<KeyboardArrowUpIcon />} >
                        Отправить
                    </Button>

                </Box>
                </form>
            </Container>
    );
};

export default ProfilePage;

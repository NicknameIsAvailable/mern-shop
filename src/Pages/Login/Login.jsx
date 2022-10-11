import React from 'react';

import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, selectIsAuth} from "../../Redux/Slices/auth.js";
import {Link, Navigate} from "react-router-dom";
import {Button, Checkbox, Container, TextField} from "@mui/material";

const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchLogin(values))
        if (!data.payload) {
            return alert('Не удалось войти в аккаунт')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        } else {
            alert('Не удалось авторизоваться ')
        }
    }

    if (isAuth) {
        return <Navigate to="/profile"/>
    }

    return (
        <Container>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1>
                    Создание аккаунта
                </h1>

                <TextField
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    fullWidth {...register('email', {required: 'Введите электронную почту'})} label="Электронная почта"
                />
                <TextField
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    fullWidth {...register('password', {required: 'Введите пароль'})} label="Пароль"
                />

                <Button
                    disabled={!isValid} type="submit" size="large" variant="contained" fullWidth
                >
                    Войти
                </Button>

            </form>
            <Link to={`/profile/registration`}>
                <p>у меня нет аккаунта</p>
            </Link>
        </Container>
    );
};

export default Login
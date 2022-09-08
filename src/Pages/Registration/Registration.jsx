import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../Redux/Slices/auth.js";
import {Link, Navigate} from "react-router-dom";
import {Checkbox, Container} from "@mui/material";

const Registration = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            mobilePhone: '',
            password: '',
            country: '',
            city: '',
            street: '',
            house: '',
            building: '',
            flat: '',
            postalCode: '',
            isPrivateHouse: false,
            avatarUrl: ''
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values))
        if (!data.payload) {
            alert('Не удалось зарегистрироваться')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
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
                <Typography variant="h5">
                    Создание аккаунта
                </Typography>
                <div>
                    <Avatar sx={{ width: 100, height: 100 }} />
                </div>

                <h2>основные данные пользователя</h2>
                <TextField
                    error={Boolean(errors.name?.message)}
                    helperText={errors.name?.message}
                    fullWidth {...register('name', {required: 'Укажите ваше имя'})} label="Имя"
                    />
                <TextField
                    error={Boolean(errors.surname?.message)}
                    helperText={errors.surname?.message}
                    fullWidth {...register('surname', {required: 'Укажите вашу фамилию'})} label="фамилия"
                />
                <TextField
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Укажите email'})} label="E-Mail" fullWidth
                    />
                <TextField
                    error={Boolean(errors.mobilePhone?.message)}
                    type="mobilePhone"
                    helperText={errors.mobilePhone?.message}
                    {...register('mobilePhone', {required: 'Укажите номер телефона'})} label="Номер телефона" fullWidth
                />
                <TextField
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    type="password"
                    fullWidth {...register('password', {required: 'Укажите пароль'})} label="Пароль"
                />

                <h2>адрес</h2>
                <TextField
                    error={Boolean(errors.country?.message)}
                    helperText={errors.country?.message}
                    fullWidth {...register('country', {required: 'Укажите страну'})} label="Страна"
                />
                <TextField
                    error={Boolean(errors.city?.message)}
                    helperText={errors.city?.message}
                    fullWidth {...register('city', {required: 'Укажите город'})} label="Город"
                />
                <TextField
                    error={Boolean(errors.street?.message)}
                    helperText={errors.street?.message}
                    fullWidth {...register('street', {required: 'Укажите улицу'})} label="Улица"
                />
                <TextField
                    error={Boolean(errors.house?.message)}
                    helperText={errors.house?.message}
                    fullWidth {...register('house', {required: 'Укажите дом'})} label="Дом"
                />
                <TextField
                    error={Boolean(errors.building?.message)}
                    helperText={errors.building?.message}
                    fullWidth {...register('building', {required: 'Укажите корпус'})} label="Корпус"
                />
                <TextField
                    error={Boolean(errors.flat?.message)}
                    helperText={errors.flat?.message}
                    fullWidth {...register('flat', {required: 'Укажите квартиру'})} label="Квартира"
                />
                <TextField
                    error={Boolean(errors.postalCode?.message)}
                    helperText={errors.postalCode?.message}
                    fullWidth {...register('postalCode', {required: 'Укажите почтовый индекс'})} label="Почтовый индекс"
                />
                <Checkbox
                    error={Boolean(errors.isPrivateHouse?.message)}
                    helperText={errors.isPrivateHouse?.message}
                    fullWidth {...register('isPrivateHouse')} label="Вы живете в частном доме?"
                    {..."Вы живете в частном доме?"}/><p>Вы живете в частном доме?</p>

                <Button
                    disabled={!isValid} type="submit" size="large" variant="contained" fullWidth
                    >
                    Зарегистрироваться
                </Button>

            </form>
            <Link to={`/profile/login`}>
                <p>у меня есть аккаунт</p>
            </Link>
        </Container>
    );
};

export default Registration
import express from "express"
import mongoose from "mongoose"
import {registerValidation} from "./Validations/auth.js";
import {userController} from "./Controllers/index.js"

mongoose.connect('mongodb+srv://gnida:9uwlDDzvmligQFHL@cluster0.jsmzi.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("Подключение к базе данных прошло успешно"))
    .catch((err) => console.log("Произошла ошибка при подключении к базе данных", err))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Сервер запущен')
})

app.post('/auth/register', registerValidation, userController.register)

app.listen(4444, (err) => {
    if (err) {
        console.log('Произошла ошибка при запуске сервера')
    }

    console.log('Сервер запущен')
})


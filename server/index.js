import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

mongoose.connect('mongodb+srv://admin:Du9RFjRKJaEpyZYc@cluster0.o4a0o.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("Подключение к базе данных прошло успешно"))
    .catch((err) => console.log("Произошла ошибка при подключении к базе данных", err))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Сервер запущен')
})

app.post('/auth/login', (req, res) => {
    console.log(req.body)

    const token = jwt.sign({
        email: req.body.email,
    }, '37wBGGnapnSO4iF8')

    res.json({
        success: true,
        token: token
    })
})

app.listen(4444, (err) => {
    if (err) {
        console.log('Произошла ошибка при запуске сервера')
    }

    console.log('Сервер запущен')
})


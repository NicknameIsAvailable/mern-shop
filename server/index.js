import express from "express"
import mongoose from "mongoose"
import {registerValidation, loginValidation, productCreateValidation, commentValidation} from "./validations.js";
import {userController, productController, commentController} from "./Controllers/index.js"
import {checkAuth, handleValidationErrors} from "./utils/index.js";

mongoose.connect('mongodb+srv://gnida:9uwlDDzvmligQFHL@cluster0.jsmzi.mongodb.net/mern-shop?retryWrites=true&w=majority')
    .then(() => console.log("Подключение к базе данных прошло успешно"))
    .catch((err) => console.log("Произошла ошибка при подключении к базе данных", err))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Сервер запущен')
})

app.post('/auth/register', registerValidation, userController.register)
app.post('/auth/login', loginValidation, userController.login)
app.get('/auth/me', checkAuth, userController.getMe);

app.post('/products', checkAuth, productCreateValidation, handleValidationErrors, productController.create)
app.patch('/products/:productId', checkAuth, productCreateValidation, handleValidationErrors, productController.update)
app.get('/products', productController.getAll)
app.get('/products/:id', productController.getOne)
app.delete('/products/:id', checkAuth, productController.remove);

app.post('/products/:id/comments', commentValidation, checkAuth, commentController.add)
app.delete('/products/:id/comments/:commentId', commentValidation, checkAuth, commentController.remove)
app.patch('/comments/:commentId', checkAuth, commentValidation, handleValidationErrors, commentController.update)
app.get('/comments', commentController.getAll)
app.get('/products/:id/comments/', commentController.getAllOfProduct)
app.get('/products/:id/comments/:commentId', commentController.getOne)
app.delete('/comments/:commentId', commentController.remove)

app.listen(4444, (err) => {
    if (err) {
        console.log('Произошла ошибка при запуске сервера')
    }

    console.log('Сервер запущен')
})


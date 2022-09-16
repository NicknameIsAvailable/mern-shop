import express from "express"
import mongoose from "mongoose"
import {
    registerValidation,
    loginValidation,
    productCreateValidation,
    commentValidation,
    orderValidation
} from "./validations.js";
import {userController, productController, commentController} from "./Controllers/index.js"
import {checkAuth, handleValidationErrors, checkAdmin, checkDeliver} from "./utils/index.js";
import * as orderController from "./Controllers/OrderController.js";
import cors from "cors";
import multer from "multer";
import fs from "fs";

mongoose.connect('mongodb+srv://gnida:9uwlDDzvmligQFHL@cluster0.jsmzi.mongodb.net/mern-shop?retryWrites=true&w=majority')
    .then(() => console.log("Подключение к базе данных прошло успешно"))
    .catch((err) => console.log("Произошла ошибка при подключении к базе данных", err))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage})

app.use(express.json)
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.get('/', (req, res) => {
    res.send('Сервер запущен')
})

// контроллер пользователей

app.post('/auth/register', registerValidation, handleValidationErrors, userController.register)
app.post('/auth/login', loginValidation, handleValidationErrors, userController.login)
app.get('/auth/me', userController.getMe);
app.get('/users', userController.getAll)
app.patch('/users/update', checkAuth, handleValidationErrors, userController.update)
app.delete('/users', checkAuth, userController.remove)

// контроллер продуктов

app.post('/products', checkAuth, checkAdmin, productCreateValidation, handleValidationErrors, productController.create)
app.patch('/products/:productId', checkAuth, checkAdmin, productCreateValidation, productController.update)
app.delete('/products/:id', checkAuth, checkAdmin, productController.remove);
app.get('/products', productController.getAll)
app.get('/products/:id', productController.getOne)
app.post('/users/cart/:id', checkAuth, handleValidationErrors, productController.addCart);
app.delete('/users/cart/:id', checkAuth, productController.cartDelete);

// контроллер заказов

app.delete('/orders/:orderId', checkAuth, orderController.deleteOrder)
app.get('/orders/', checkAuth, checkAdmin, orderController.getOrders)
app.get('/users/orders/:userId', checkAuth, orderController.getUserOrders)
app.get('/orders/:orderId/', checkAuth, orderController.getOrder)
app.patch('/orders/:orderId', checkAuth, checkDeliver, handleValidationErrors, orderController.changeOrderStatus)
app.post('/users/cart/',checkAuth, orderValidation, orderController.createOrder)
app.post('/users/products/:id', checkAuth, orderValidation, orderController.buyOne)

// контроллер комментариев

app.post('/products/:id/comments', commentValidation, checkAuth, handleValidationErrors, commentController.add)
app.delete('/comments/:commentId', commentValidation, checkAuth, commentController.remove)
app.patch('/comments/:commentId', checkAuth, commentValidation, handleValidationErrors, commentController.update)
app.get('/comments', commentController.getAll)
app.get('/products/:id/comments/', commentController.getAllOfProduct)
app.get('/products/:id/comments/:commentId', commentController.getOne)

app.listen(4444, (err) => {
    if (err) {
        console.log('Произошла ошибка при запуске сервера')
    }

    console.log('Сервер запущен')
})


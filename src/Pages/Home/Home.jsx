import React from 'react';
import Header from "./components/Header/index"
import {Button, Card, Container} from '@mui/material';
import ProductCard from "./components/ProductCard/ProductCard";
import "./Home.css"

export const productArr = [
    {
        id: "vuanIsQo17Y8hUjV",
        title: "Чебурек",
        price: 70,
        imageUrl: "https://ideireceptov.ru/wp-content/uploads/2022/02/chebureki-s-nacinkoy.jpg",
        description: "Офигенный, просто невероятный чебурек"
    },
    {
        id: "2AdVtq4kE5gYSobK",
        title: "Шаверма",
        price: 170,
        imageUrl: "https://leone-bel.ru/upload/iblock/064/m1yd3ky59jnxthuupdnzaff2if71e3ua.jpg",
        description: "Жесточайшая шаверма"
    },
    {
        id: "62LKzuGWWMZnF7ts",
        title: "Бургер",
        price: 120,
        imageUrl: "https://i.pinimg.com/originals/a3/39/e5/a339e55d4eccbab6527bbad6ab985723.jpg",
        description: "Вкуснейший бургер с сыром"
    },
    {
        id: "TStssgxHIiLsP13c",
        title: "Пиво",
        price: 90,
        imageUrl: "https://kartinkin.net/uploads/posts/2021-07/1626744250_4-kartinkin-com-p-razlivnoe-pivo-fon-krasivo-4.jpg",
        description: "Хмельное"
    },
    {
        id: "Gtcd6SgO6Z65khqe",
        title: "Салат",
        price: 180,
        imageUrl: "https://attuale.ru/wp-content/uploads/2018/11/129_image.jpg",
        description: "Вкуснейший салат"
    },
]

const Home = () => {

    const productList = productArr.map((product) =>
        <ProductCard
            id={product.id}
            title={product.title}
            price={product.price}
            imageUrl={product.imageUrl}
            description={product.description}/>
    )

    return (
        <div className="home">
            <Container className="ProductList">
                {productList}
            </Container>
        </div>
    );
};

export default Home;

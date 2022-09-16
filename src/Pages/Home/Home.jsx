import React from 'react';
import Grid from '@mui/material/Grid';

import {useDispatch, useSelector} from "react-redux";

import {fetchAllProducts} from "../../Redux/Slices/products.js";
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import {Container} from "@mui/material";
import axios from "../../axios.js";

export const Home = () => {
    const dispatch = useDispatch()
    const {products} = useSelector((state) => state.products)

    const isPostLoading = products.status === 'loading'

    React.useEffect(() => {
        axios.get("/products")
    }, [])

    console.log(products)


    return (
        <Container>
        {(isPostLoading ? [...Array(24)] : products.items).map((obj, index) =>
            isPostLoading ? (
                <ProductCard key={index} isLoading={true}/>
            ) : (
                <ProductCard
                    id={obj._id}
                    title={obj.title}
                    images={obj.images}
                    tags={obj.tags}
                    count={obj.count}
                    price={obj.price}
                />
            ))}
        </Container>
    );
};

export default Home
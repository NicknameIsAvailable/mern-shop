import React from 'react';
import {Container} from "@mui/material";
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <Container>
            <h1>
                Нет доступа
            </h1>
            <h2>
                <Link to={"/"}>
                    вернуться на основную страницу
                </Link>
            </h2>
        </Container>
    );
};

export default Error;

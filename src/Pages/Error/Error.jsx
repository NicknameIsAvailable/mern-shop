import React from 'react';
import {Container} from "@mui/material";
import {Link} from "react-router-dom";

const Error = (props) => {
    return (
        <Container>
            <h1>
                {props.message || "ошибка"}
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

import React, {useState, Fragment} from 'react'
import "./Search.css"

import MetaData from "../layout/MetaData";
import {useNavigate} from 'react-router-dom';
const Search=() => {
    const [keyword, setKeyword]=useState("");
    const history = useNavigate();
    const searchSubmitHandler=(e) => {
        e.preventDefault();
        console.log(keyword.replace(/\s/g, ''))
        if(keyword.trim()) {
            history(`/products/${keyword}`);
        } else {
            history("/products");
        }
    };

    return (
        <Fragment>
            <MetaData title="Search A Product -- ECOMMERCE" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    );
};

export default Search
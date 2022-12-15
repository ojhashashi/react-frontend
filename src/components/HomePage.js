import React, { useState, useEffect } from 'react';
import pdtApi from '../apiPath/pdtApi';
import catApi from '../apiPath/catApi';
import './css/home.css';
export default function HomePage() {
    var [count, setCount] = useState(0);
    useEffect(() => {
        fetch(pdtApi + 'show-pdt')
            .then(res => res.json())
            .then(result => {
                console.log("res", result)
                setCount(result.ans_count);
            })
    }, [])
    var [catcount, setCatCount] = useState([]);

    useEffect(() => {
        fetch(catApi + 'show-cat')
            .then(res => res.json())
            .then(result => {
                setCatCount(result.length);
            })
    }, [])
    return (
        <div className="container">
            <div className="row home-row">
                <div className="col-md-4">
                    <div className="card-counter primary">
                        <i className="fa fa-code-fork"></i>
                        <span className="count-numbers">{count}</span>
                        <span className="count-name">Products</span>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card-counter danger">
                        <i className="fa fa-ticket"></i>
                        <span className="count-numbers">{catcount}</span>
                        <span className="count-name">Categories</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React from 'react';
import { Link } from 'react-router-dom';


export default function Header() {
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Task</a>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/show-product">Products</Link></li>
                            <li><Link to="/show-category">Categories</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

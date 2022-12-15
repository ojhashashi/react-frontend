import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import pdtApi from '../apiPath/pdtApi';
import './css/style.css'

export default function ShowPdt() {
    var [apidata, setApidata] = useState([]);
    var [count, setCount] = useState(0);
    var [page, setPage] = useState(0);
    var [pagearr, setPagearr] = useState([]);
    var [perpage, setPerpage] = useState(10);
    var [pageno, setPageNo] = useState(1);
    var [totalpagecount, setTotalPageCount] = useState(1);

    useEffect(() => {
        fetch(pdtApi + 'show-pdt')
            .then(res => res.json())
            .then(result => {
                // console.log("DATA FROM API")
                console.log(result)
                // setApidata(result);
                var { ans_product, ans_count } = result;

                console.log(ans_count);
                setApidata(ans_product);
                setCount(ans_count);

                var totalPages = Math.ceil(ans_count / perpage);

                setPage(totalPages);

                var arrPage = [];
                for (var i = 1; i <= totalPages; i++) {
                    // console.log(i);
                    arrPage.push(i);
                }
                setTotalPageCount(arrPage.length)
                setPagearr(arrPage);

            })
    }, [])

    function myfunc1(ev) {
        ev.preventDefault();
        console.log(ev.target.attributes.for.value);
        const pageno = ev.target.attributes.for.value;
        setPageNo(pageno)

        var skipvalue = perpage * pageno - perpage;
        console.log(skipvalue, pageno);
        console.log(`show-pdt/${skipvalue}/${perpage}`);
        fetch(`${pdtApi}show-pdt/${skipvalue}/${perpage}`)
            .then(res => res.json())
            .then(ans => {
                console.log("After Pagination");
                console.log(ans);
                var { ans_product, ans_count } = ans;
                setApidata(ans_product);
            })
    }

    return (
        <div className="container">
            <div className="row">

                <div className="col-md-10 col-md-offset-1">

                    <div className="panel panel-default panel-table">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col col-xs-6">
                                    <h3 className="panel-title">All Products</h3>
                                </div>
                                <div className="col col-xs-6 text-right">
                                    <Link className="btn btn-sm btn-info btn-create m-1 text-white" to="/show-category">Categories</Link>
                                    <Link className="btn btn-sm btn-primary btn-create" to="/add-product">Add Products</Link>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <table className="table table-striped table-bordered table-list">
                                <thead>
                                    <tr>

                                        <th><em className="fa fa-cog"></em></th>
                                        <th className="hidden-xs">Product Id</th>
                                        <th>Product Name</th>
                                        <th>Category Name</th>
                                        <th>Category Id</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apidata && apidata.map((obj, i) =>
                                        <tr key={i}>
                                            <td align="center">
                                                <Link to={"/edit-pdt/" + obj._id} className="btn btn-default" style={{ marginRight: '4px' }}><em className="fa fa-pencil"></em></Link>
                                                <Link className="btn btn-danger" to={"/delete-pdt/" + obj._id}><em className="fa fa-trash"></em></Link>
                                            </td>
                                            <td className="hidden-xs">{obj._id}</td>
                                            <td>{obj.name}</td>
                                            <td>{obj.catvalues[0].name}</td>
                                            <td>{obj.catid}</td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>

                        </div>
                        <div className="panel-footer">
                            <div className="row">
                                <div className="col col-xs-4">Page {pageno} of {totalpagecount}
                                </div>
                                <div className="col col-xs-8">
                                    <ul className="pagination hidden-xs pull-right">
                                        {
                                            pagearr && pagearr.length > 0 && pagearr.map((val, i) =>
                                                <li key={i}><a htmlFor={val} href="#" onClick={myfunc1}>{val}</a></li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div></div></div>
    )
}

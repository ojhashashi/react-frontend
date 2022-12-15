import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import catApi from '../apiPath/catApi';


export default function ShowCat() {
    var [apidata, setApidata] = useState([]);

    useEffect(() => {
        fetch(catApi + 'show-cat')
            .then(res => res.json())
            .then(result => {
                setApidata(result);
            })
    }, [])

    return (
        <div className="container">
            <div className="row">

                <div className="col-md-10 col-md-offset-1">

                    <div className="panel panel-default panel-table">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col col-xs-6">
                                    <h3 className="panel-title">Categories</h3>
                                </div>
                                <div className="col col-xs-6 text-right">
                                    <Link className="btn btn-sm btn-primary btn-create" to="/add-category">Add Category</Link>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <table className="table table-striped table-bordered table-list">
                                <thead>
                                    <tr>

                                        <th><em className="fa fa-cog"></em></th>
                                        <th className="hidden-xs">Category Id</th>
                                        <th>Category Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apidata && apidata.map((obj, i) =>
                                        <tr key={i}>
                                            <td align="center">
                                                <Link to={"/edit-cat/" + obj._id} className="btn btn-default" style={{ marginRight: '4px' }}><em className="fa fa-pencil"></em></Link>
                                                <Link className="btn btn-danger" to={"/delete-cat/" + obj._id}><em className="fa fa-trash"></em></Link>
                                            </td>
                                            <td className="hidden-xs">{obj._id}</td>
                                            <td>{obj.name}</td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div></div></div>
    )
}
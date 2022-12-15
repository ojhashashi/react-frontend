import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import catApi from '../apiPath/catApi';
import pdtApi from '../apiPath/pdtApi';



export default function AddPdt() {
    var x1 = useRef();
    var x2 = useRef();

    var navigate = useNavigate();

    var [apidata, setApidata] = useState([]);

    useEffect(() => {
        fetch(catApi + 'show-cat')
            .then(res => res.json())
            .then(result => {
                // console.log("DATA FROM API")
                // console.log(result)
                setApidata(result);
            })
    }, [])

    var add = () => {
        var categoryid = x1.current.value;
        var proname = x2.current.value;

        // console.log(categoryid);
        // console.log(proname);
        if (categoryid != "" && proname != "") {
            fetch(pdtApi + 'add-pdt', {
                method: "POST",
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify(
                    {
                        name: proname,
                        catid: categoryid
                    }
                )
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result)

                    navigate('/show-product')
                })
        }
        else {
            alert('Values Required')
        }
    }

    return (
        <div className="container">
            <div id="signupbox" className="mainbox col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">Add Product</div>
                    </div>
                    <div className="panel-body" >

                        <div className="form-horizontal">

                            <div id="div_id_name" className="form-group required">
                                <div className="controls col-md-8 ">
                                    <select className='input-md textinput textInput form-control' ref={x1}>
                                        <option value="" selected disabled>Please Select Category</option>
                                        {
                                            apidata && apidata.map((obj, i) =>
                                                <option key={i} value={obj._id} >{obj.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>

                            <div id="div_id_username" className="form-group required">
                                <div className="controls col-md-8 ">
                                    <input className="input-md textinput textInput form-control" ref={x2} placeholder="Enter Product Name *" type="text" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="controls col-md-8 ">
                                    <button onClick={add} className="btn btn-primary">Add Product</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


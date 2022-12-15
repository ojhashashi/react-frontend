import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import pdtApi from '../apiPath/pdtApi';


export default function EditPro() {
    let { id } = useParams();

    const [cat, setCat] = useState([]);
    const [pro, setPro] = useState({});

    var x1 = useRef();
    let navigate = useNavigate();

    useEffect(() => {
        fetch(pdtApi + 'pdt-cat/' + id)
            .then(res => res.json())
            .then(val => {
                console.log(val);
                setCat(val['catRecord']);
                setPro(val['productRec'])
            });

    }, []);

    var myfunc = (ev) => {
        ev.preventDefault();
        // console.log({
        //     name:pro,
        //     catid:x1.current.value
        // });
        fetch(pdtApi + `update-pdt/${id}`, {
            method: "PUT",
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(
                {
                    name: pro,
                    catid: x1.current.value
                }
            )
        })
            .then(res => res.json())
            .then(answer => {
                console.log(answer);
                navigate('/show-product')
            })
    }
    return (

        <div className="container">
            <div id="signupbox" className="mainbox col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">Edit Product</div>
                    </div>
                    <div className="panel-body" >

                        <form onSubmit={myfunc} className="form-horizontal">

                            <div id="div_id_name" className="form-group required">
                                <div className="controls col-md-8 ">
                                    <select className='input-md textinput textInput form-control' ref={x1}>
                                        <option value="" selected disabled>Please Select Category</option>
                                        {
                                            cat && cat.map((obj, i) =>
                                                <option key={i} value={obj._id} >{obj.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>

                            <div id="div_id_username" className="form-group required">
                                <div className="controls col-md-8 ">
                                    <input className="input-md textinput textInput form-control" value={pro.name} onChange={(ev) => { setPro(ev.target.value) }} type="text" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="controls col-md-8 ">
                                    <button className="btn btn-primary">Update Product</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


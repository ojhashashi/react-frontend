import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import catApi from '../apiPath/catApi';


export default function EditCat() {
    var [name, setName] = useState('');
    let { id } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        fetch(catApi + 'show-cat/' + id)
            .then(res => res.json())
            .then(val => {
                console.log(val);
                var { _id, name } = val;
                setName(name);
            })
    }, [])


    function updateRec(ev) {
        ev.preventDefault();
        var categoryName = name;

        fetch(catApi + 'update-cat/' + id, {
            method: "PUT",
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(
                {
                    name: categoryName
                }
            )
        })
            .then(res => res.json())
            .then(val => {
                console.log(val);
                if (val['msg']) {
                    navigate('/show-category')
                }
            })
    }
    return (

        <div className="container">
            <div id="signupbox" className="mainbox col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">Edit Category</div>
                    </div>
                    <div className="panel-body" >

                        <form className="form-horizontal" onSubmit={updateRec}>

                            <div id="div_id_username" className="form-group required">
                                <div className="controls col-md-8 ">
                                    <input className="input-md  textinput textInput form-control" value={name} onChange={(ev) => { setName(ev.target.value) }} type="text" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="controls col-md-8 ">
                                    <button className="btn btn-primary">Update</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

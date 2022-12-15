import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import catApi from '../apiPath/catApi';

export default function AddCat() {
    var [cat, setCat] = useState('');
    var [err, setErr] = useState('');

    var navigate = useNavigate();

    var add = (ev) => {
        ev.preventDefault();
        // console.log('test')

        if (cat == '') {
            setErr('* Category Required')
        }
        else {
            fetch(catApi + 'add-cat', {
                method: "POST",
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify(
                    {
                        name: cat
                    }
                )
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    setErr('Category Added ')
                    navigate('/show-category')
                })
        }
    }

    var getCategoryValue = (ev) => {
        setCat(ev.target.value);
    }
    return (
        <div className="container">
            <div id="signupbox" className="mainbox col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">Add Category</div>
                    </div>
                    <div className="panel-body" >

                        <form className="form-horizontal" onSubmit={add}>

                            <div id="div_id_username" className="form-group required">
                                <div className="controls col-md-8 ">
                                    <input className="input-md  textinput textInput form-control" onChange={getCategoryValue} placeholder="Add Category *" type="text" />
                                </div>
                                <div className="controls col-md-4">
                                    <span className='text-danger'>{err}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="controls col-md-8 ">
                                    <button className="btn btn-primary">Save</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

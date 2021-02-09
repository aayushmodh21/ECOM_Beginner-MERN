import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        // Sign In Action
        dispatch(signin(email, password));
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                { loading && <LoadingBox /> }
                { error && <MessageBox varient="danger">{error}</MessageBox> }
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <div>
                        New Customer? {' '}
                        <Link to={`/register?redirect=${redirect}`}>Create New Account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SigninScreen;

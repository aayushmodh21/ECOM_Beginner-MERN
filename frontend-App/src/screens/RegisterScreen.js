import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        // Sign In Action
        if(password !== confirmPassword) {
            alert('Password and Confirm Password are not Matched!')
        }
        else {
            dispatch(register(name, email, password));
        }
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
                    <h1>Create Account</h1>
                </div>

                { loading && <LoadingBox /> }
                { error && <MessageBox varient="danger">{error}</MessageBox> }

                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter Name" onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Enter Confirm Password" onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <div>
                        Already have an Account? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Signin</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen;

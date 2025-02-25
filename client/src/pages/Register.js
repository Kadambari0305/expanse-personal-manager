import React,{useState} from 'react';
import Spinner from '../components/Spinner';  // Ensure the correct path

import {Form,Input,message} from 'antd';
//import FormItem from 'antd/es/form/FormItem';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'


const Register = () => {
    const navigate = useNavigate();
const [loading,setloading] =useState(false)
    //form submit
    const submitHandler = async (values) => {
        try {
            setloading(true)
            await axios.post('users/register', values);
            message.success('Registeration Successfull');
            setloading(false)
            navigate('/login');
        
        } catch (error) {
            setloading(false)
            message.error('invalid username or password');

        }
    };
    return(
        <>
        <div className="register-page">
            {loading && <Spinner />}
            <Form layout="vertical" onFinish={submitHandler}>
                <h1>Register Form</h1>
                <Form.Item label="Name" name="name">
                    <Input/>
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type="email" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type ="password"/>
                </Form.Item>
                <div className="d-flex justify-content-between">
                    <Link to="/login">Already registered ? Click here to login</Link>
                    <button className="btn btn-primary">Register</button>
                </div>

            </Form>
            
        </div>

        </>
    );
};

export default Register;

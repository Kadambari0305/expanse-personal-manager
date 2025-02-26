import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/auth/register", values);
      message.success("Registration Successful!");
      setLoading(false);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message || "Registration failed");
    }
  };

  // Prevent logged-in users from accessing register page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-page">
      {loading && <Spinner />}
      
      <Form layout="vertical" onFinish={submitHandler}>
        <h1>Register</h1>

        <Form.Item 
          label="Name" 
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          label="Email" 
          name="email"
          rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item 
          label="Password" 
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input type="password" />
        </Form.Item>

        <div className="d-flex justify-content-between">
          <Link to="/login">Already Registered? Click Here to Login</Link>
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </Form>
    </div>
  );
};

export default Register;

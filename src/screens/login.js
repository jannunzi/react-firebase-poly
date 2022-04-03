import React, {useRef, useState} from 'react';
import {useAuth} from "../contexts/auth-context";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()
  const handleLogin = async () => {
    try {
      setError('')
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/home")
    } catch(error) {
      setError(error.message)
    }
  }
  return (
    <div>
      <h1>Login</h1>
      {
        error &&
        <div className="alert-danger p-2 mb-2">
          {JSON.stringify(error)}
        </div>
      }
      <input type="email" className="form-control mb-2" ref={emailRef}/>
      <input type="password" className="form-control mb-2" ref={passwordRef}/>
      <button onClick={handleLogin}
              className="btn btn-primary w-100">
        Login</button>
    </div>
  );
};

export default Login;
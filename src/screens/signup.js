import React, {useRef, useState} from 'react';
import {useAuth} from "../contexts/auth-context";
import {Link, useNavigate} from "react-router-dom";

const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSignup = async (e) => {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('passwords dont match')
    }
    try {
      setError('')
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/login")
    } catch(error) {
      setError(error.message)
    }
  }
  return (
    <div className="">
      <h1>Signup</h1>
      {
        error &&
        <div className="alert-danger mt-2 p-2">
          {error}
        </div>
      }
      <input placeholder="email" type="email" className="form-control mb-2"
        ref={emailRef}/>
      <input placeholder="password" className="form-control mb-2"
        ref={passwordRef}
        type="password"/>
      <input placeholder="confirm password" className="form-control mb-2"
        ref={passwordConfirmRef}
        type="password"/>
      <button disabled={loading} onClick={handleSignup}
              className="btn btn-primary w-100 mb-2">Sign Up</button>
      <div>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default Signup;


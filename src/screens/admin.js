import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/auth-context";

const Administrator = () => {
  const [error, setError] = useState()
  const {currentUser, signout} = useAuth()
  const navigate = useNavigate()
  const handleSignout = () => {
    try {
      signout()
      navigate("/")
    } catch(e) {
      setError(e.message)
    }
  }
  return (
    <div>
      <h1>Administrator</h1>
      { error &&
      <div className="alert-danger mb-2 p-2">
        {error}
      </div>
      }
      <button className="btn btn-danger"
              onClick={handleSignout}>
        Signout
      </button>
      {JSON.stringify(currentUser)}
    </div>
  );
};

export default Administrator;
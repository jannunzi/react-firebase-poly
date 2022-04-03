import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/auth-context";

const Home = () => {
  const {currentUser, signout} = useAuth()
  const [error, setError] = useState()
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
      <h1>Home</h1>
      { error &&
        <div className="alert-danger mb-2 p-2">
          {error}
        </div>
      }
      {currentUser.email}
      <Link to="/signup">Signup</Link>
      <Link to="/">Login</Link>
      <Link to="/profile">Profile</Link>
      <div>
      <button className="btn btn-danger"
              onClick={handleSignout}>
        Signout
      </button>
      </div>
      {JSON.stringify(currentUser)}
    </div>
  );
};

export default Home;
import React, {useContext, useEffect, useState} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {auth} from "../firebase-app";

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  
  const signout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setCurrentUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])
  
  const value = { currentUser, signup, login, signout }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

import React, {useEffect, useRef, useState} from 'react';
import {useAuth} from "../contexts/auth-context";
import * as tuitsService from "../services/tuits-service"
const TuitsList = () => {
  const tuitRef = useRef()
  const {currentUser} = useAuth()
  // const [newTuit, setNewTuit] = useState({tuit: 'New tuit'})
  const [tuits, setTuits] = useState([])
  const handleTuit = async () => {
    let newTuit = {
      tuit: tuitRef.current.value,
      author: currentUser.email
    }
    console.log(newTuit)
    const addedTuitRef = await tuitsService.addTuit(newTuit)
    newTuit.id = addedTuitRef.id
    setTuits([...tuits, newTuit])
  }
  const getAllTuits = async () => {
    const tuits = await tuitsService.getAllTuits()
    setTuits(tuits)
  }
  const getMyTuits = async () => {
    const tuits = await tuitsService.getMyTuits(currentUser.email)
    setTuits(tuits)
  }
  useEffect(() => {
    getMyTuits()
  }, [])
  const handleDeleteTuit = async (tuit) => {
    await tuitsService.deleteTuit(tuit.id)
    // console.log(tuit)
    setTuits(
      tuits.filter(t => tuit.id !== t.id)
    )
  }
  return (
    <div>
      <textarea
        className="form-control mb-1"
        ref={tuitRef}></textarea>
      <button onClick={handleTuit}
              className="float-end btn btn-primary rounded-pill">
        Tuit
      </button>
      <ul className="mt-5 list-group">
        {
          tuits.map(tuit =>
          <li key={tuit.id} className="list-group-item">
            <span onClick={() => handleDeleteTuit(tuit)} className="float-end fs-2">&times;</span>
            <div>
              @{tuit.author.split("@")[0]}
            </div>
            <div>
              {tuit.tuit}
            </div>
          </li>)
        }
      </ul>
    </div>
  )
}

export default TuitsList;
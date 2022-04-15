import React, {useEffect, useRef, useState} from 'react';
import Json from "../components/json";
import * as service from "../services/super-chat-service";
import {onSnapshot} from "firebase/firestore"
import './super-chat.css'
import {useAuth} from "../contexts/auth-context";

const SuperChat = () => {
  const [messages, setMessages] = useState([])
  const getAllMessages = async () => {
    const messages = await service.getAllMessages()
    setMessages(messages)
  }
  useEffect(() => {
    getAllMessages()
  }, [])
  const {currentUser} = useAuth()
  onSnapshot(service.messagesQuery, (snapshot) => {
    const ms = snapshot.docs.map(doc => {
      return ({...doc.data(), id: doc.id})
    })
    setMessages(ms)
  })
  const messageRef = useRef()
  const handleSend = async () => {
    await service.postMessage({
      message: messageRef.current.value,
      author: currentUser.email
    })
    messageRef.current.value = ''
  }
  const handleDelete = async (message) => {
    await service.deleteMessage(message.id)
  }
  return (
    <div>
      <h1>Super Chap</h1>
      {/*<div>*/}
        <ul className="list-group">
          {
            messages && messages.map((message) =>
              <li className="list-group-item">
                <span
                  className={`
                  ${message.author === currentUser.email ? 'my-message':'not-my-message'}
                  `}>
                  {message.message}
                  <span
                    onClick={() => handleDelete(message)}
                    className="ms-2">&times;</span>
                </span>
              </li>
            )
          }
        </ul>
        <textarea
          ref={messageRef}
          className="form-control mt-2 mb-2"></textarea>
        <button
          onClick={handleSend}
          className="btn btn-primary rounded-pill btn-lg w-100">
          Send
        </button>
        <Json data={messages}/>
      {/*</div>*/}
    </div>
  );
};

export default SuperChat;
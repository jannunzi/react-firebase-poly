import {db} from "../firebase-app"
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore"

const tuitsCollection = collection(db, 'tuits')

export const addTuit = (tuit) => {
  return addDoc(tuitsCollection, tuit)
}
export const updateTuit = (id, updatedTuit) => {
  const tuitDoc = doc(db, 'tuits', id)
  return updateDoc(tuitDoc, updatedTuit)
}

export const deleteTuit = (id) => {
  const tuitDoc = doc(db, 'tuits', id)
  return deleteDoc(tuitDoc) 
}

const docsToTuits = (docs) => {
  const tuits = docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return tuits
}

export const getAllTuits = async () => {
  const data = await getDocs(tuitsCollection)
  const tuits = docsToTuits(data.docs)
  return tuits
}

export const getMyTuits = async (email) => {
  const q = query(tuitsCollection,
    where("author", "==", email));
  const data = await getDocs(q)
  const tuits = docsToTuits(data.docs)
  return tuits
}

export const getTuit = (id) => {
  const tuitDoc = doc(db, 'tuits', id)
  return getDoc(tuitDoc)
}
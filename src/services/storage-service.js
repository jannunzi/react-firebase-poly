import {getStorage, ref, getDownloadURL,
  listAll, uploadBytes,
  deleteObject} from "firebase/storage"

const storage = getStorage()

export const deleteImage = (image) => {
  const imageRef = ref(storage, image)
  return deleteObject(imageRef)
}

export const uploadImage = (file) => {
  const imageRef = ref(
    storage, file.name)
  return uploadBytes(imageRef, file)
}

export const getImageSrc = (image) => {
  const imageRef = ref(storage, image)
  return getDownloadURL(imageRef)
}

export const listAllImages = async () => {
  const rootRef = ref(storage)
  return listAll(rootRef)
    .then((res) => {
      const urlPromises = res.items.map((itemRef) => {
        return getDownloadURL(itemRef)
      });
      return Promise.all(urlPromises)
    })
}

// https://firebasestorage.googleapis.com/v0/b/react-firebase-poly.appspot.com/o/blue.jpg?alt=media&token=6050d668-0ab8-4744-a701-052bfad2ba2e
// https://firebasestorage.googleapis.com/v0/b/react-firebase-poly.appspot.com/o/blue.jpg
import {getStorage, ref, getDownloadURL,
  listAll,
  uploadBytes} from "firebase/storage"

const storage = getStorage()

const storageRef = ref(storage)

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

export const listAllImages2 = async () => {
  const rootRef = ref(storage)
  const refs = await listAll(rootRef)
  const urls = []
  await refs.items.forEach(async (itemRef) => {
    const url = await getDownloadURL(itemRef)
    urls.push(url)
  })
  return urls  
}

// https://firebasestorage.googleapis.com/v0/b/react-firebase-poly.appspot.com/o/blue.jpg?alt=media&token=6050d668-0ab8-4744-a701-052bfad2ba2e
// https://firebasestorage.googleapis.com/v0/b/react-firebase-poly.appspot.com/o/blue.jpg
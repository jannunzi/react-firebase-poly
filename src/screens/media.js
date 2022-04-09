import React, {useEffect, useRef, useState} from 'react';
import * as storageService from '../services/storage-service'
import Json from "../components/json";
const Media = () => {
  const [src, setSrc] = useState('')
  const [srcs, setSrcs] = useState([])
  const filesRef = useRef()
  const listImages = async () => {
    const urls = await storageService.listAllImages()
    setSrcs(urls)
  }
  const image = 'blue.jpg'
  const getImageSrc = async () => {
    const url = await storageService.getImageSrc(image)
    setSrc(url)
  }
  useEffect(() => {
    getImageSrc()
    listImages()
  }, [])
  const handleUpload = () => {
    Object.entries(filesRef.current.files)
      .forEach(([key, file]) => {
      storageService.uploadImage(file)
    })
  }
  return (
    <div>
      <h1>Media</h1>
<button
  onClick={handleUpload}
  className="float-end btn btn-primary">
  Upload
</button>
<input
  multiple
  ref={filesRef}
  type="file"
  className="form-control w-75"
/>
      <hr/>
      <img src={src} height={100}/>
      <hr/>
      {
        srcs.map(src => 
          <img key={src}
               src={src}
               height={100}/>
        )
      }
      <Json>
        {srcs}
      </Json>
    </div>
  );
};
export default Media;
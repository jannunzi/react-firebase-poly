import React, {useEffect, useState} from 'react';
import Json from "../components/json";
import axios from "axios";
import JsonObject from "../components/json/json-object";
import JsonData from "../components/json/json-data";
import * as jsonQuery from "json-query"

const apikey = '1f0383ed4c734d41b4483e19aa054ae0'
const api = 'https://newsapi.org/v2/everything?q=tesla&from=2022-03-16&sortBy=publishedAt&apiKey=1f0383ed4c734d41b4483e19aa054ae0'

const JsonRenderer = () => {
  const [data, setData] = useState()
  const getData = async () => {
    const response = await axios.get(api)
    const data = response.data
    const articles = jsonQuery('articles', {data})
    const ewq = articles.value.map(art => {
      const {content, title} = art
      return {title, content}
    })
    setData(ewq)
    // setData(articles.value)
  }
  useEffect(() => {
    getData()
  }, [])
  
  const format = {
    urlToImage: {widget: 'image'}
  }
  
  return (
    <div className="mt-5">
      {/*<Json/Object obj={data}/>*/}
      <JsonData data={data} format={format}/>
      <Json data={data}/>
    </div>
  );
};

export default JsonRenderer;
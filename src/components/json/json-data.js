import React from 'react';
import JsonString from "./json-string";
import JsonNumber from "./json-number";
import JsonArray from "./json-array";
import JsonObject from "./json-object";
import JsonBoolean from "./json-boolean";
import JsonDate from "./json-date";

const JsonData = ({data, key, format}) => {
  if (data === null) return 'null';
  if (typeof data === 'undefined') return 'undefined';
  const isTypeOf = (data, type) => {
    if (data === null) return false
    return data.constructor.toString().indexOf(type) > -1;
  }
  return (
    <>
      {isTypeOf(data, 'String') &&
      <JsonString key={key} data={data} format={format}/>}
      {isTypeOf(data, 'Number') &&
      <JsonNumber key={key} data={data} format={format}/>}
      {isTypeOf(data, 'Boolean') &&
      <JsonBoolean key={key} data={data} format={format}/>}
      {isTypeOf(data, 'Object') &&
      <JsonObject key={key} data={data} format={format}/>}
      {isTypeOf(data, 'Array') &&
      <JsonArray key={key} data={data} format={format}/>}
      {isTypeOf(data, 'Date') &&
      <JsonDate key={key} data={data} format={format}/>}
    </>
  )
}

export default JsonData;
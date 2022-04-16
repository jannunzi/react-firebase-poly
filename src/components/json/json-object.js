import React, {useState} from 'react';
import JsonData from "./json-data";

const JsonObject = ({data, kk, format}) => {
  return (
    <ul className="list-group">
      {
        Object.entries(data).map(([key, value]) =>
          <li className="list-group-item">
            <JsonData key={key} format={format} data={value}/>
          </li>
        )
      }
    </ul>
  );
};

export default JsonObject;
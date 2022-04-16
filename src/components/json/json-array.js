import React from 'react';
import JsonData from "./json-data";

const JsonArray = ({data}) => {
  return (
    <ul className="list-group">
      {
        data.map((item, ndx) =>
          <li className="list-group-item">
            <JsonData data={item}/>
          </li>)
      }
    </ul>
  );
};

export default JsonArray;
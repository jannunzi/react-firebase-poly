import React from 'react';

const Json = ({data}) => {
  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default Json;
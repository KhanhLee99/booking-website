import { css } from '@emotion/core';
import React from 'react';
import { useState } from "react";
import SyncLoader from 'react-spinners/SyncLoader';

const override = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

function Loading(props) {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#0DAB42");
  
    return (
      <div className="sweet-loading">
        <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
        <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" />
  
        <SyncLoader color={color} loading={loading} css={override} size={150} />
      </div>
    );
  }
  
  export default Loading;
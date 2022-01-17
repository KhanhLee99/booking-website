import React from 'react';
import PropTypes from 'prop-types';
import ScaleLoading from './ScaleLoading';

Loading.propTypes = {

};

const size = {
    width: '100%',
    height: window.innerHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

function Loading(props) {
    return (
        <div style={size} className='gray-bg'>
            <ScaleLoading
                colorLoading='#4db7fe'
            />
        </div>
    );
}

export default Loading;
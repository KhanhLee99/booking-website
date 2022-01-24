import React from 'react';
import PropTypes from 'prop-types';
import ScaleLoading from './ScaleLoading';

Loading.propTypes = {

};

const size = {
    width: '100%',
    minHeight: window.innerHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 9999999999,
    background: 'rgba(246, 246, 246, .75)'
}

function Loading(props) {
    const { } = props;
    return (
        <div style={size} className='gray-bg '>
            <ScaleLoading
                colorLoading='#4db7fe'
            />
        </div>
    );
}

export default Loading;
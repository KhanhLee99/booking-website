import React from 'react';
import PropTypes from 'prop-types';
import ScaleLoading from './ScaleLoading';
import useWindowDimensions from '../../@use/useWindowDimensions';

Loading.propTypes = {


};



function Loading(props) {

    const { height } = useWindowDimensions();

    const size = {
        width: '100%',
        minHeight: height,
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

    return (
        <div style={size} className='gray-bg '>
            <ScaleLoading
                colorLoading='#4db7fe'
            />
        </div>
    );
}

export default Loading;
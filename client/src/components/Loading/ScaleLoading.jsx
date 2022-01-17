import React from 'react';
import PropTypes from 'prop-types';
import ScaleLoader from "react-spinners/ScaleLoader";

ScaleLoading.propTypes = {

};

function ScaleLoading(props) {

    const { colorLoading } = props;

    return (
        <ScaleLoader color={colorLoading ? colorLoading : "white"} size={5} margin={3} height={50} width={7} radius={2} />
    );
}

export default ScaleLoading;
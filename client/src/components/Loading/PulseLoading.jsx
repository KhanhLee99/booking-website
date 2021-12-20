import React from 'react';
import PropTypes from 'prop-types';
import PulseLoader from "react-spinners/PulseLoader";

PulseLoading.propTypes = {

};

function PulseLoading(props) {
    const { colorLoading } = props;
    return (
        <PulseLoader color={colorLoading ? colorLoading : "#fff"} loading={true} size={10} margin={2} />
    );
}

export default PulseLoading;
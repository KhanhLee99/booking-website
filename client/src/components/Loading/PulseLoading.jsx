import React from 'react';
import PropTypes from 'prop-types';
import PulseLoader from "react-spinners/PulseLoader";

PulseLoading.propTypes = {

};

function PulseLoading(props) {
    return (
        <PulseLoader color="#fff" loading={true} size={10} margin={2} />
    );
}

export default PulseLoading;
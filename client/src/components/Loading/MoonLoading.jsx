import React from 'react';
import PropTypes from 'prop-types';
import SyncLoader from "react-spinners/SyncLoader";

MoonLoading.propTypes = {

};

function MoonLoading(props) {
    const { colorLoading } = props;

    return (
        <SyncLoader color={colorLoading ? colorLoading : "white"} size={5} margin={1} />
    );
}

export default MoonLoading;
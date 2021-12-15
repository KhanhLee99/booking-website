import React from 'react';
import PropTypes from 'prop-types';

MapListing.propTypes = {

};

function MapListing(props) {
    return (
        <div className="fs-inner-container map-fixed">
            {/* Map */}
            <div id="map-container">
                <div id="map" data-map-scroll="true">
                    {/* map goes here */}
                </div>
            </div>
        </div>
    );
}

export default MapListing;
import React from 'react';
import PropTypes from 'prop-types';
import './CommonAddListing.scss';
import HeaderHost, { HeaderAddListing } from '../../features/Host/components/HeaderHost';
import TabAddListing from '../../features/Host/components/TabAddListing/TabAddListing';

CommonAddListing.propTypes = {

};

function CommonAddListing(props) {
    return (
        <div className='k-wrap'>
            <HeaderAddListing />
            <TabAddListing />
            <div className='k-content'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-8 k-left-side'>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommonAddListing;
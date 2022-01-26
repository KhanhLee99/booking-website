import React from 'react';
import PropTypes from 'prop-types';
import './CommonAddListing.scss';
import HeaderHost, { HeaderAddListing } from '../../features/Host/components/HeaderHost';
import TabAddListing from '../../features/Host/components/TabAddListing/TabAddListing';
import { useParams } from 'react-router-dom';

CommonAddListing.propTypes = {

};

function CommonAddListing(props) {
    const { id } = useParams();
    return (
        <div className='k-wrap'>
            <HeaderAddListing />
            <TabAddListing id={id} />
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
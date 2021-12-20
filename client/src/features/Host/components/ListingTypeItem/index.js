import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

ListingTypeItem.propTypes = {

};

function ListingTypeItem(props) {
    const { name, id, idActive, selectListingType } = props;
    return (
        <div className='k-list-property-type' onClick={() => selectListingType(id)}>
            <div className={idActive === id ? 'k-property-type-item active' : 'k-property-type-item'}>
                <p>{name}</p>
                <img className='' src='/images/blog-compact-post-01.jpg' />
            </div>
        </div >
    );
}

export default ListingTypeItem;
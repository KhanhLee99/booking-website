import React from 'react';
import PropTypes from 'prop-types';

AmenityDetail.propTypes = {

};

function AmenityDetail(props) {
    const { item } = props;
    return (
        <>
            <h4 className='mt-5 mb-4'>{item.amenity_type}</h4>
            <ul className="listing-features checkboxes margin-top-0">
                {
                    item.amenities.map((amenity, index) => {
                        return (
                            <AmenityDetailItem
                                key={index}
                                amenity={amenity}
                            />
                        )
                    })
                }
            </ul>
        </>
    );
}

export default AmenityDetail;

function AmenityDetailItem(props) {
    const { amenity } = props;
    return (
        <li><i className="im im-icon-Basket-Coins k-icon"></i>{amenity.name}</li>
    )
}
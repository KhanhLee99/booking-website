import React from 'react';
import PropTypes from 'prop-types';

AmenityDetail.propTypes = {

};

function AmenityDetail(props) {
    const { item, title } = props;
    return (
        <>
            <h4 className='mt-5 mb-4' style={title}>{item.amenity_type}</h4>
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
        <li><i className="im im-icon-Basket-Coins k-icon"></i><a style={li_amenity_a}>{amenity.name}</a></li>
    )
}

const li_amenity_a = {
    fontWeight: 500,
    color: '#878c9f',
    fontFamily: "'Nunito', sans-serif",
    fontSize: '14px',
}
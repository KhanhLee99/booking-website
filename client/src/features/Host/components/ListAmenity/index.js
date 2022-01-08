import React from 'react';
import PropTypes from 'prop-types';
import AmenityItem from '../AmenityItem';
import PulseLoading from '../../../../components/Loading/PulseLoading';

ListAmenity.propTypes = {

};

function ListAmenity(props) {

    const { amenities, type, handleCheckboxChange, listAmenityChecked } = props;
    return (
        <div className="checkboxes in-row margin-bottom-20">
            <ul className="listing-features checkboxes margin-top-0" style={{ columns: 2 }}>
                {amenities.length ? amenities.filter(amenity => amenity.amenity_type_id === type.id).map((amenity, index) => (
                    <AmenityItem
                        key={index}
                        id={amenity.id}
                        name={amenity.name}
                        handleCheckboxChange={handleCheckboxChange}
                        listAmenityChecked={listAmenityChecked}
                    />
                )) : <PulseLoading colorLoading='#000000' />}
            </ul>
        </div >
    );
}

export default ListAmenity;

{/* <ul className="listing-features checkboxes margin-top-0">
    {
        item.amenities.map((amenity, index) => {
            return (
                <li><i className="im im-icon-Basket-Coins k-icon"></i>{amenity.name}</li>
            )
        })
    }
</ul> */}
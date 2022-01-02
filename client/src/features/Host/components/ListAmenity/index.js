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
            {amenities.length ? amenities.filter(amenity => amenity.amenity_type_id === type.id).map((amenity, index) => (
                <AmenityItem
                    key={index}
                    id={amenity.id}
                    name={amenity.name}
                    handleCheckboxChange={handleCheckboxChange}
                    listAmenityChecked={listAmenityChecked}
                />
            )) : <PulseLoading colorLoading='#000000' />}
        </div>
    );
}

export default ListAmenity;
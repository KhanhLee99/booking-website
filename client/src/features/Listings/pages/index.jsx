import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import listingApi from '../../../api/listingApi';
import { useSelector, useDispatch } from 'react-redux';
// import { getListingsLocation } from '../listingLocationSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { getListings } from '../../Guest/guestSlice';
import testApi from "../../../api/testApi";
import ListListingsLocation from '../components/ListListingsLocation';


ListingsLocation.propTypes = {

};

function ListingsLocation(props) {
    // const listings1 = useSelector(state => state.abc.listings);
    const [listings, setListings] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            console.log(listings);
            const response = await listingApi.getListingsLocation();
            // console.log(response.data.data);
            // const actionResult = await dispatch(getListings());
            // const response = unwrapResult(actionResult);
            setListings(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleClick = () => {
        console.log(listings);
    }

    return (
        <div>
            <ListListingsLocation
                listings={listings}
            />
            {/* {listings.map((index, item) => {
                console.log(item.name);
            })} */}
            <button onClick={handleClick}>submit</button>
        </div>
    );
}

export default ListingsLocation;
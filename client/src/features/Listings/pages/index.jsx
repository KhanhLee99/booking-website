import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import listingApi from '../../../api/listingApi';
import ListListingsLocation from '../components/ListListingsLocation';
import { useParams } from 'react-router';
import Paginate from '../components/Paginate';
import Header from '../../../components/Header';
import { useSelector } from 'react-redux';
import LoginPopup from '../../../components/LoginPopup';
import MapListing from '../components/Map';
import Header2 from '../../../components/Header/Header2/Header2';
import FilterListing from '../components/FilterListing';
import ListingItem from '../components/ListingItem';


ListingsLocation.propTypes = {

};

const main = {
    height: '100%',
    width: '100%',
    // position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    // opacity: 0,
}



function ListingsLocation(props) {

    const [triggerPopup, setTriggerPopup] = useState(false);
    const loggedInUser = useSelector((state) => state.userSlice.current);
    const isLoggedIn = !!loggedInUser.id;

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const { id } = useParams();
    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetchListings();
    }, [currentPage]);

    const fetchListings = async () => {
        try {
            const params = {
                city_id: id,
                limit: postsPerPage,
                page: currentPage
            }
            setLoading(true);
            const response = await listingApi.getListingsLocation(params);
            setLoading(false);
            setListings(response.data.data.data);
            setTotalPages(response.data.data.last_page);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="k-main" style={main}>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                        <ListListingsLocation />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingsLocation;
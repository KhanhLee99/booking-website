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
        <>
            {/* <div id="page">
                <Header
                    loggedInUser={loggedInUser}
                    isLoggedIn={isLoggedIn}
                    setTriggerPopup={setTriggerPopup}
                />
                <main>
                    <div className="container margin_60_35">
                        <div className="isotope-wrapper">
                            <div className="row">
                                <ListListingsLocation
                                    listings={listings}
                                    loading={loading}
                                    loggedInUser={loggedInUser}
                                    setTriggerPopup={setTriggerPopup}
                                />
                                <Paginate
                                    paginate={paginate}
                                    totalPages={totalPages}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div> */}
            <div id="wrapper">
                <Header2 />
                <div className="clearfix" />
                <div className="fs-container">
                    <div className="fs-inner-container content">
                        <div className="fs-content">
                            <FilterListing />
                            <section className="listings-container margin-top-30">
                                <div className="row fs-switcher">
                                    <div className="col-md-6">
                                        <p className="showing-results">14 Results Found </p>
                                    </div>
                                </div>
                                <div className="row fs-listings">
                                    <ListingItem />
                                    <ListingItem />
                                    <ListingItem />
                                </div>
                                <Paginate
                                />
                            </section>
                        </div>
                    </div>
                    <MapListing />
                </div>
            </div>
            <LoginPopup
                trigger={triggerPopup}
                setTriggerPopup={setTriggerPopup}
            />
        </>

    );
}

export default ListingsLocation;
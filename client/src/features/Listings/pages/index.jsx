import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import listingApi from '../../../api/listingApi';
import ListListingsLocation from '../components/ListListingsLocation';
import { useParams } from 'react-router';
import Paginate from '../components/Paginate';
import Header from '../../../components/Header';


ListingsLocation.propTypes = {

};

function ListingsLocation(props) {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(2);
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
        <div id="page">
            <Header />
            <main>
                <div class="container margin_60_35">
                    <div class="isotope-wrapper">
                        <div class="row">
                            <ListListingsLocation
                                listings={listings}
                                loading={loading}
                            />
                            <Paginate
                                paginate={paginate}
                                totalPages={totalPages}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ListingsLocation;
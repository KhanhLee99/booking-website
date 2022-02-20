import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import adminListing from '../../../../api/adminListing';
import GuestListingActive from '../../components/GuestListingActive/GuestListingActive';
import Loading from '../../../../components/Loading/Loading';
import CommonAdmin from '../../../../components/CommonAdmin/CommonAdmin';
import NoData from '../../../../components/NoData/NoData';
import './AdminListingActive.scss';
import { Link, useHistory } from 'react-router-dom';
import useQuery from '../../../../@use/useQuery';
import queryString from 'query-string';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import ReactPaginate from 'react-paginate';


AdminListingActive.propTypes = {

};

function AdminListingActive(props) {
    const qs = queryString.parse(props.location.search);
    const query = useQuery();
    const history = useHistory();

    const [listingActive, setListingActive] = useState([]);
    const [totalPending, setTotalPending] = useState(0);
    const [totalActive, setTotalActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(() => { return qs.page || 0 });
    const [postsPerPage] = useState(() => { return qs.limit || 15 });
    const [totalPages, setTotalPages] = useState(0);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        history.push(`/admin/listing/active?page=${event.selected + 1}`)
    };

    useEffect(() => {
        const getCountListing = () => {
            try {
                adminListing.getCountListingFilter().then(res => {
                    setTotalPending(res.data.total_pending);
                    setTotalActive(res.data.total_active);
                })
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }

        getCountListing();
    }, []);

    useEffect(() => {
        const fetchListingActive = async () => {
            try {
                const params = {
                    limit: postsPerPage,
                    page: query.get('page') || 1,
                }
                setLoading(true);
                await adminListing.getListingActive({ params }).then(res => {
                    setListingActive(res.data.data.data);
                    setTotalPages(res.data.data.last_page);
                    setLoading(false);
                });
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }

        fetchListingActive();

        return () => {
            setListingActive([]);
        }
    }, [currentPage]);

    const lockListing = async (id) => {
        await adminListing.lockListing(id).then(res => {
            setListingActive(listingActive.filter(item => item.id != id));
        });
    }

    return (
        <CommonAdmin>
            {loading && <Loading />}
            <div className="dashboard-title fl-wrap">
                <h3>Listings</h3>
                <ul className='filter-admin-listing'>
                    <li style={{ border: '1.5px solid black' }}><Link to='/admin/listing/active'>Active ({totalActive})</Link></li>
                    <li style={{ border: '1px solid #dddddd' }}><Link to='/admin/listing/pending'>Pending ({totalPending})</Link></li>
                </ul>
            </div>
            {listingActive.length > 0 ? <GuestListingActive
                list={listingActive}
                lockListing={lockListing}
            /> : <NoData />}
            <div className='h-20 fl-wrap' />

            {(totalPages > 0 && listingActive.length > 0) ? <ReactPaginate
                previousLabel={
                    <MdArrowBackIosNew />
                }
                nextLabel={
                    <MdArrowForwardIos />
                }
                forcePage={(query.get('page') != undefined) ? query.get('page') - 1 : 0}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={totalPages === 0 ? "page-item disabled" : "page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={totalPages === 0 ? "page-item disabled" : "page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            /> : null}

        </CommonAdmin>
    );
}

export default AdminListingActive;


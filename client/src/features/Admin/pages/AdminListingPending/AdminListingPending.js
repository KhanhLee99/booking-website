import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AdminListingPending.scss';
import adminListing from '../../../../api/adminListing';
import GuestListingPending from '../../components/GuestListingPending/GuestListingPending';
import ReactNotificationComponent from '../../../../components/Notification/ReactNotification';
import Loading from '../../../../components/Loading/Loading';
import CommonAdmin from '../../../../components/CommonAdmin/CommonAdmin';
import NoData from '../../../../components/NoData/NoData';
import { Link, useHistory } from 'react-router-dom';
import useQuery from '../../../../@use/useQuery';
import queryString from 'query-string';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { AdminTab } from '../../../../app/constant';

AdminListingPending.propTypes = {

};

function AdminListingPending(props) {
    const qs = queryString.parse(props.location.search);
    const query = useQuery();
    const history = useHistory();

    const [listingPending, setListingPending] = useState([]);
    const [totalPending, setTotalPending] = useState(0);
    const [totalActive, setTotalActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(() => { return qs.page || 0 });
    const [postsPerPage] = useState(() => { return qs.limit || 15 });
    const [totalPages, setTotalPages] = useState(0);

    const removeListingActive = (id) => {
        const index = listingPending.findIndex(item => item.id === id);
        if (index !== -1) {
            setListingPending(listingPending.filter(item => item.id != id));
        }
    }

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        history.push(`/admin/listing/pending?page=${event.selected + 1}`)
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
        const fetchListingPending = async () => {
            try {
                const params = {
                    limit: postsPerPage,
                    page: query.get('page') || 1,
                }
                setLoading(true);
                await adminListing.getListingPending({ params }).then(res => {
                    setListingPending(res.data.data.data);
                    setTotalPages(res.data.data.last_page);
                    setLoading(false);
                });
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }

        fetchListingPending();

        return () => {
            setListingPending([]);
        }
    }, [currentPage]);

    return (
        <CommonAdmin>
            <Child
                currentTab={AdminTab.LISTINGS}
                listingPending={listingPending}
                totalActive={totalActive}
                totalPending={totalPending}
                removeListingActive={removeListingActive}
                setLoading={setLoading}
                title='Success'
                body='Active listing success'
                totalPages={totalPages}
                query={query}
                handlePageClick={handlePageClick}
                loading={loading}
            />


        </CommonAdmin>
    );
}

export default AdminListingPending;

function Child(props) {

    const handlePublicListing = async (id) => {
        try {
            setLoading(true);
            await adminListing.activeListing(id).then(res => {
                removeListingActive(id);
                setLoading(false);
                showNotification(title, body);
            }).catch(err => {
                console.log(err.message);
                setLoading(false);
            })
        } catch (err) {
            console.log(err);
        }
    }

    const { showNotification, loading,
        title, body,
        listingPending, removeListingActive,
        setLoading, totalActive, totalPending,
        totalPages, query, handlePageClick
    } = props;

    return (
        <>
            {loading && <Loading />}
            <div className="dashboard-title fl-wrap">
                <h3>Listings</h3>
                <ul className='filter-admin-listing'>
                    <li style={{ border: '1px solid #dddddd' }}><Link to='/admin/listing/active'>Active ({totalActive})</Link></li>
                    <li style={{ border: '1.5px solid black' }}><Link to='/admin/listing/pending'>Pending ({totalPending})</Link></li>
                </ul>
            </div>
            {listingPending.length > 0 ? <GuestListingPending
                list={listingPending}
                handlePublicListing={handlePublicListing}
            /> : <NoData />}

            <div className='h-20 fl-wrap' />

            {(totalPages > 0 && listingPending.length > 0) ? <ReactPaginate
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
        </>
    )
}


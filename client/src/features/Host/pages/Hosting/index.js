import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderHost from '../../components/HeaderHost';
import './styles.scss';
import hostApi from '../../../../api/hostApi';
import { useSelector } from 'react-redux';
import HostingItem from '../../components/Hosting/HostingItem/HostingItem';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import HostingSkeleton from '../../components/Hosting/HostingSkeleton';
import useQuery from '../../../../@use/useQuery';
import ReactPaginate from 'react-paginate';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { HostTab, ListingStatus } from '../../../../app/constant';
import queryString from 'query-string';
import NoData from '../../../../components/NoData/NoData';


Hosting.propTypes = {

};

function Hosting(props) {
    const query = useQuery();
    const qs = queryString.parse(props.location.search);
    const history = useHistory();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState(() => {
        let st = ListingStatus.ALL;
        if (qs.status, (typeof qs.status) == 'string') st = qs.status;
        return st;
    });

    const handlePageClick = (event) => {
        historyReplace({ page: event.selected + 1, status: status });
        setCurrentPage(event.selected + 1);
    };

    const getListings = async (page = 1) => {
        try {
            const params = {
                status: status,
                limit: postsPerPage,
                page: page,
            }
            setLoading(true);
            await hostApi.getListingsByUserId({ params }).then(res => {
                setLoading(false)
                setListings(res.data.data.data);
                setTotalPages(res.data.data.last_page);
                setTotal(res.data.data.total);
                window.scrollTo(0, 0)
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleChange = e => {
        historyReplace({ page: 1, status: e.target.value });
        setStatus(e.target.value);
    }

    const historyReplace = (params) => {
        history.replace({
            pathname: props.location.pathname,
            search: queryString.stringify(params)
        })
    }

    useEffect(() => {
        getListings(query.get('page'));

        return () => {
            setListings([]);
        }
    }, [currentPage, status]);

    return (
        <div id="wrapper">
            <HeaderHost
                currentTab={HostTab.LISTINGS}
            />
            <div className="clearfix" />
            <div className="k-content">
                <div className='k-listing-info'>
                    <div className='k-listing-count'>
                        {loading ? null : <h3>{total} nhà/phòng cho thuê</h3>}
                    </div>
                    <div className='filter-host-listing'>
                        <div className='dropdown'>
                            <select value={status} className="no-search-select" onChange={handleChange}>
                                <option value={ListingStatus.ALL}>All</option>
                                <option value={ListingStatus.UNVERIFIED}>Chưa xác thực</option>
                                <option value={ListingStatus.ACTIVE}>Đang hoạt động</option>
                                <option value={ListingStatus.STOP_PUBLIC}>Dừng hiển thị</option>
                                <option value={ListingStatus.BLOCK_ACTIVITY}>Chặn hoạt động</option>
                            </select>
                        </div>

                        <div className='search'>
                            <input type='text' placeholder='Search' />
                        </div>
                    </div>
                </div>
                {listings.length > 0 ? <table className="table" style={{
                    boxShadow: '0 0.46875rem 2.1875rem rgb(4 9 20 / 3%), 0 0.9375rem 1.40625rem rgb(4 9 20 / 3%), 0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%)',
                    borderRadius: 4,
                }}>
                    <thead>
                        <tr>
                            <th scope="col" className='text-center'>#ID</th>
                            <th scope="col" className='k-title-name-th'>LISTING</th>
                            <th scope="col">STREET ADDRESS</th>
                            <th scope="col">PROPERTY TYPE</th>
                            {/* <th scope="col" className='text-center'>STATUS</th> */}
                            <th scope="col" className='text-center'>VERIFIED</th>
                            {/* <th scope="col">Calendar</th> */}
                            <th scope="col" className='text-center'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <HostingSkeleton /> :
                            listings.map((listing, index) => (
                                <HostingItem
                                    key={index}
                                    listing={listing}
                                />
                            ))
                        }
                    </tbody>
                </table> : <NoData />}

                {(totalPages > 0 && listings.length > 0) ? <ReactPaginate
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
            </div>
        </div>
    );
}

export default Hosting;
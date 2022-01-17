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
import { ListingStatus } from '../../../../app/constant';

Hosting.propTypes = {

};

function Hosting(props) {
    const query = useQuery();
    const history = useHistory();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState(ListingStatus.ALL);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        history.push(`/host/listings/?page=${event.selected + 1}`)
    };

    const getListings = async () => {
        try {
            const params = {
                status: status,
                limit: postsPerPage,
                page: query.get('page') || 1,
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
        console.log(e.target.value)
        setStatus(e.target.value);
    }

    useEffect(() => {

        getListings();

        return () => {
            setListings([]);
        }
    }, [currentPage, status]);

    return (
        <div id="wrapper">
            <HeaderHost />
            <div className="clearfix" />
            <div className="k-content">
                <div className='k-listing-info'>
                    <div className='k-listing-count'>
                        {loading ? null : <h3>{total} nhà/phòng cho thuê</h3>}
                    </div>
                    <div className='filter-host-listing'>
                        <div className='dropdown'>
                            <select value={status} className="no-search-select" onChange={handleChange}>
                                <option value={ListingStatus.ALL}>Tất cả chỗ nghỉ</option>
                                <option value={ListingStatus.UNVERIFIED}>Chưa xác thực</option>
                                <option value={ListingStatus.ACTIVE}>Đang hoạt động</option>
                                <option value={ListingStatus.STOP_PUBLIC}>Dừng hiển thị</option>
                                <option value={ListingStatus.BLOCK_ACTIVITY}>Chặn hoạt động</option>
                            </select>
                        </div>

                        <div className='search'>
                            <input type='text' placeholder='Tìm kiếm' />
                        </div>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col" className='k-title-name-th'>Nhà/phòng cho thuê</th>
                            <th scope="col">ĐỊA ĐIỂM</th>
                            <th scope="col">TRẠNG THÁI</th>
                            <th scope="col">XÁC THỰC</th>
                            <th scope="col">LỊCH</th>
                            <th scope="col">HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <>
                            <HostingSkeleton />
                        </> :
                            listings.map((listing, index) => (
                                <HostingItem
                                    key={index}
                                    listing={listing}
                                />
                            ))
                        }
                    </tbody>
                </table>
                {totalPages > 0 ? <ReactPaginate
                    previousLabel={
                        <MdArrowBackIosNew />
                    }
                    nextLabel={
                        <MdArrowForwardIos />
                    }

                    // initialPage={1}
                    // initialPage={currentPage}
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
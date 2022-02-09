import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AdminPayment.scss';
import adminPaymentApi from '../../../../api/adminPaymentApi';
import NoData from '../../../../components/NoData/NoData';
import { parseVNDCurrency } from '../../../../@helper/helper';
import CommonAdmin from '../../../../components/CommonAdmin/CommonAdmin';
import Loading from '../../../../components/Loading/Loading';
import moment from 'moment';
import queryString from 'query-string';
import useQuery from '../../../../@use/useQuery';
import ReactPaginate from 'react-paginate';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

AdminPayment.propTypes = {

};

function AdminPayment(props) {
    const qs = queryString.parse(props.location.search);
    const query = useQuery();
    const history = useHistory();

    const [payout, setPayout] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(() => { return qs.page || 0 });
    const [postsPerPage] = useState(() => { return qs.limit || 20 });
    const [totalPages, setTotalPages] = useState(0);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        history.push(`/admin/payout/?page=${event.selected + 1}`)
    };

    useEffect(() => {
        const fetchPayout = async () => {
            const params = {
                limit: postsPerPage,
                page: query.get('page') || 1,
            }
            setLoading(true);
            await adminPaymentApi.index({ params }).then(res => {
                setPayout(res.data.data.data);
                setTotalPages(res.data.data.last_page);
                setLoading(false);
            })
        }

        fetchPayout();

        return () => {
            setPayout([]);
        }
    }, [currentPage])
    return (
        <CommonAdmin>
            {loading && <Loading />}
            <div className="dashboard-title fl-wrap">
                <h3>Payout</h3>
            </div>
            <div className="dashboard-list-box fl-wrap" style={{ marginTop: 0 }}>
                <div className="card table-card">
                    <div className="card-block">
                        <div className="table-responsive">
                            {payout.length > 0 ?
                                <table className="table table-hover table-borderless">
                                    <thead>
                                        <tr>
                                            <th style={{ color: '#495057' }} className='text-center'>#Reservation Id</th>
                                            <th style={{ color: '#495057' }}>Name</th>
                                            <th style={{ color: '#495057' }} className='text-center'>Host Income</th>
                                            <th style={{ color: '#495057' }} className='text-center'>Web Fee</th>
                                            <th style={{ color: '#495057' }} className='text-center'>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {payout.map((item, index) => (
                                            <PayoutItem
                                                key={index}
                                                id={item.id}
                                                hostIncome={item.host_recive}
                                                webFee={item.web_recive}
                                                reservation_id={item.reservation_id}
                                                user_name={item.user_name}
                                                user_email={item.user_email}
                                                user_avatar={item.user_avatar}
                                                created_at={item.created_at}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                                : <NoData />}
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-20 fl-wrap' />

            {(totalPages > 0 && payout.length > 0) ? <ReactPaginate
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

export default AdminPayment;

const PayoutItem = (props) => {
    const { id, hostIncome, webFee, reservation_id, user_name, user_email, user_avatar, created_at } = props;
    return (
        <tr>
            {/* <td className="text-center text-muted">#{id}</td> */}
            <td className='text-center'>
                <div class="badge badge-warning">#{reservation_id}</div>
            </td>
            <td>
                <div className="widget-content p-0"><div className="widget-content-wrapper">
                    <div className="widget-content-left mr-3">
                        <div className="widget-content-left">
                            <img width={40} src={user_avatar} alt="" className="rounded-circle"
                                style={{
                                    verticalAlign: 'middle',
                                    borderStyle: 'none',
                                    width: 40,
                                    height: 40,
                                }}
                            />
                        </div>
                    </div>
                    <div className="widget-content-left flex2">
                        <div className="widget-heading">{user_name}</div>
                        <div className="widget-subheading opacity-7">{user_email}</div>
                    </div>
                </div>
                </div>
            </td>
            <td className='text-center'>
                <div class="badge badge-success">{parseVNDCurrency(hostIncome)}</div>
            </td>
            <td className='text-center'>
                <div class="badge badge-info">{parseVNDCurrency(webFee)}</div></td>

            <td className='text-center'>{moment(created_at, "YYYY-MM-DD hh:mm:ss").format('LL')}</td>
        </tr>
    )
}
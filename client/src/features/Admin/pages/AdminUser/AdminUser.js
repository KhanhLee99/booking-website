import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import useQuery from '../../../../@use/useQuery';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import adminUser from '../../../../api/adminUserApi';
import CommonAdmin from '../../../../components/CommonAdmin/CommonAdmin';
import Loading from '../../../../components/Loading/Loading';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import NoData from '../../../../components/NoData/NoData';
import { AdminTab } from '../../../../app/constant';

AdminUser.propTypes = {

};

function AdminUser(props) {
    const qs = queryString.parse(props.location.search);
    const query = useQuery();
    const history = useHistory();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(() => { return qs.page || 0 });
    const [postsPerPage] = useState(() => { return qs.limit || 15 });
    const [totalPages, setTotalPages] = useState(0);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        history.push(`/admin/users?page=${event.selected + 1}`)
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const params = {
                limit: postsPerPage,
                page: query.get('page') || 1,
            }
            await adminUser.get_all_user({ params }).then(res => {
                setUsers(res.data.data.data);
                setTotalPages(res.data.data.last_page);
                setLoading(false);
            })
        }

        fetchUsers();

        return () => {
            setUsers([]);
        }

    }, [currentPage]);
    return (
        <CommonAdmin>
            <Child
                loading={loading}
                users={users}
                totalPages={totalPages}
                query={query}
                handlePageClick={handlePageClick}
                currentTab={AdminTab.USERS}
            />
        </CommonAdmin>
    );
}

export default AdminUser;

const Child = (props) => {
    const { loading, users, totalPages, query, handlePageClick } = props;
    return (
        <>
            {loading && <Loading />}
            <div className="dashboard-title fl-wrap">
                <h3>Users</h3>
            </div>
            <div className="dashboard-list-box fl-wrap" style={{ marginTop: 0 }}>
                <div className="card table-card">
                    <div className="card-block">
                        <div className="table-responsive">
                            {users.length > 0 ?
                                <table className="table table-hover table-borderless">
                                    <thead>
                                        <tr>
                                            <th style={{ color: '#495057' }} className='text-center'>#Id</th>
                                            <th style={{ color: '#495057' }}>Name</th>
                                            <th style={{ color: '#495057' }} className='text-center'>Email</th>
                                            <th style={{ color: '#495057' }} className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {users.map((item, index) => (
                                            <AdminUserItem
                                                key={index}
                                                id={item.id}
                                                name={item.name}
                                                email={item.email}
                                                phone_number={item.phone_number}
                                                avatar_url={item.avatar_url}
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

            {(totalPages > 0 && users.length > 0) ? <ReactPaginate
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

function AdminUserItem(props) {
    const { id, name, email, phone_number, avatar_url } = props;
    return (
        <tr>
            <td className='text-center'>
                <div className="badge badge-warning">#{id}</div>
            </td>
            <td>
                <div className="widget-content p-0"><div className="widget-content-wrapper">
                    <div className="widget-content-left mr-3">
                        <div className="widget-content-left">
                            <img width={40} src={avatar_url} alt="" className="rounded-circle"
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
                        <div className="widget-heading">{name}</div>
                        <div className="widget-subheading opacity-7">{phone_number}</div>
                    </div>
                </div>
                </div>
            </td>
            <td className='text-center'>{email}</td>
            <td className='text-center'>
                <button className='btn btn-danger' style={{ fontSize: '95%', fontWeight: 600 }}>Delete</button>
            </td>
        </tr>
    )
}
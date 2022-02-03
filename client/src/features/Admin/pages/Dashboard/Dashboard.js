import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import CommonAdmin from '../../../../components/CommonAdmin/CommonAdmin';
import adminDashboardApi from '../../../../api/adminDashboardApi';

Dashboard.propTypes = {

};

function Dashboard(props) {

    const [overview, setOverview] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            await adminDashboardApi.getOverviewInfo().then(res => {
                setOverview(res.data.data);
            })
        }

        fetchData();

        return () => {
            setOverview([]);
        }

    }, []);

    return (
        <CommonAdmin>
            <div className="dashboard-title fl-wrap">
                <h3>Dashboard</h3>
            </div>
            <div className="list-single-facts fl-wrap">
                <div className="row">
                    <div className="col-md-4">
                        {/* inline-facts */}
                        <div className="dashboard_inline-facts-wrap gradient-bg" style={{ height: '112px' }}>
                            <div className="inline-facts">
                                <i className="fal fa-home" />
                                <div className="milestone-counter">
                                    <div className="stats animaper">
                                        <div className="num" data-content={0} data-num={1054}>{overview.listing_count || 0}</div>
                                    </div>
                                </div>
                                <h6>Listings</h6>
                            </div>
                            {/* <div className="stat-wave">
                                <svg viewBox="0 0 100 25">
                                    <path fill="#fff" d="M0 30 V12 Q30 17 55 2 T100 11 V30z" />
                                </svg>
                            </div> */}
                        </div>
                        {/* inline-facts end */}
                    </div>

                    <div className="col-md-4">
                        {/* inline-facts  */}
                        <div className="dashboard_inline-facts-wrap gradient-bg " style={{ height: '112px' }}>
                            <div className="inline-facts">
                                <i className="fal fa-user" />
                                <div className="milestone-counter">
                                    <div className="stats animaper">
                                        <div className="num" data-content={0} data-num={125}>{overview.host_count || 0}</div>
                                    </div>
                                </div>
                                <h6>Hosts</h6>
                            </div>
                            {/* <div className="stat-wave">
                                <svg viewBox="0 0 100 25">
                                    <path fill="#fff" d="M0 30 V12 Q30 12 55 5 T100 11 V30z" />
                                </svg>
                            </div> */}
                        </div>
                        {/* inline-facts end */}
                    </div>

                    <div className="col-md-4">
                        {/* inline-facts  */}
                        <div className="dashboard_inline-facts-wrap gradient-bg " style={{ height: '112px' }}>
                            <div className="inline-facts">
                                <i className="fal fa-comments-alt" />
                                <div className="milestone-counter">
                                    <div className="stats animaper">
                                        <div className="num" data-content={0} data-num={2557}>{overview.review_count || 0}</div>
                                    </div>
                                </div>
                                <h6>Total Reviews</h6>
                            </div>
                            {/* <div className="stat-wave">
                                <svg viewBox="0 0 100 25">
                                    <path fill="#fff" d="M0 30 V12 Q30 17 55 12 T100 11 V30z" />
                                </svg>
                            </div> */}
                        </div>
                        {/* inline-facts end */}
                    </div>

                </div>
            </div>
        </CommonAdmin>
    );
}

export default Dashboard;
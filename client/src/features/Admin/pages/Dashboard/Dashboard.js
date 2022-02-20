import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import CommonAdmin from '../../../../components/CommonAdmin/CommonAdmin';
import adminDashboardApi from '../../../../api/adminDashboardApi';
import ChartLine from '../../components/Chart/ChartLine';
import ChartBar from '../../components/Chart/ChartBar';
import ChartLineEarnings from '../../components/Chart/ChartLineEarnings';
import { AdminTab } from '../../../../app/constant';

Dashboard.propTypes = {

};

function Dashboard(props) {

    const [overview, setOverview] = useState([]);
    const [chartUsers, setChartUsers] = useState([]);
    const [chartHosts, setChartHosts] = useState([]);
    const [chartEarnings, setChartEarnings] = useState([]);
    const [chartReservations, setChartReservations] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            await adminDashboardApi.getOverviewInfo().then(res => {
                setOverview(res.data.data);
            })
        }

        const getChartData = async () => {
            await adminDashboardApi.getChartData().then(res => {
                setChartUsers(res.data.data.chart_users_data);
                setChartHosts(res.data.data.chart_hosts_data);
                setChartEarnings(res.data.data.chart_earnings_data);
                setChartReservations(res.data.data.chart_reservations_data);
            })
        }

        fetchData();
        getChartData();

        return () => {
            setOverview([]);
        }

    }, []);

    return (
        <CommonAdmin
            currentTab={AdminTab.DASHBOARD}
        >
            <Child
                overview={overview}
                chartEarnings={chartEarnings}
                chartUsers={chartUsers}
                chartHosts={chartHosts}
                chartReservations={chartReservations}
                currentTab={AdminTab.DASHBOARD}
            />
        </CommonAdmin>
    );
}

export default Dashboard;

function Child(props) {
    const { overview, chartEarnings, chartUsers, chartHosts, chartReservations } = props;
    return (
        <>
            <div className="dashboard-title fl-wrap">
                <h3>Dashboard</h3>
            </div>
            <div className="list-single-facts fl-wrap" style={{ marginBottom: 20 }}>
                <div className="row">
                    <div className="col-md-4">
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
                            <div className="stat-wave">
                                <svg viewBox="0 0 100 25">
                                    <path fill="#fff" d="M0 30 V12 Q30 17 55 2 T100 11 V30z" />
                                </svg>
                            </div>
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
                            <div className="stat-wave">
                                <svg viewBox="0 0 100 25">
                                    <path fill="#fff" d="M0 30 V12 Q30 12 55 5 T100 11 V30z" />
                                </svg>
                            </div>
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
                            <div className="stat-wave">
                                <svg viewBox="0 0 100 25">
                                    <path fill="#fff" d="M0 30 V12 Q30 17 55 12 T100 11 V30z" />
                                </svg>
                            </div>
                        </div>
                        {/* inline-facts end */}
                    </div>

                </div>
            </div>
            <div className="list-single-main-item fl-wrap">
                <div className='row'>
                    <div className="col-md-12">
                        <div className='block_box chart-line' style={{ padding: '15px' }}>
                            <ChartLineEarnings
                                chartEarnings={chartEarnings}
                            />
                        </div>
                    </div>
                    <div className='h-20 fl-wrap' />
                    <div className="col-md-8">
                        <div className='block_box chart-line' style={{ padding: '15px' }}>
                            <ChartLine
                                chartUsers={chartUsers}
                                chartHosts={chartHosts}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className='block_box chart-bar' style={{ padding: '15px' }}>
                            <ChartBar
                                chartReservations={chartReservations}
                            />
                        </div>
                    </div>
                    <div className='h-20 fl-wrap' />
                </div>
            </div>
        </>
    )
}
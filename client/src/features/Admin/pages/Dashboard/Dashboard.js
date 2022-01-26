import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';

Dashboard.propTypes = {

};

function Dashboard(props) {
    return (
        <>
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
                                        <div className="num" data-content={0} data-num={1054}>1030</div>
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
                                        <div className="num" data-content={0} data-num={125}>242</div>
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
                                        <div className="num" data-content={0} data-num={2557}>2300</div>
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
        </>
    );
}

export default Dashboard;
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CommonAdmin from '../../../../components/CommonAdmin/CommonAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getMyNotify, getTotalNoticationsUnread } from '../../../../app/reducer/notifySlice';

AdminFeed.propTypes = {

};

function AdminFeed(props) {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifySlice.myNotify || []);
    const currentPage = useSelector((state) => state.notifySlice.currentPage || 1);

    useEffect(() => {
        dispatch(getTotalNoticationsUnread());
        dispatch(getMyNotify({
            page: currentPage,
            limit: 5
        }));
    }, []);
    return (
        <CommonAdmin>
            <div className="dashboard-title fl-wrap">
                <h3>Your feed</h3>
            </div>
            <div className="dashboard-list-box fl-wrap" style={{ marginTop: 0 }}>
                {
                    notifications.length > 0 ?
                        notifications.map((notify, index) => (
                            <FeedItem
                                key={index}
                                notify={notify}
                            />
                        ))
                        : null
                }
            </div>
        </CommonAdmin >
    );
}

export default AdminFeed;

function FeedItem(props) {
    const { notify } = props;
    return (
        <div className="dashboard-list fl-wrap">
            <div className="dashboard-message">
                <span className="new-dashboard-item"></span>
                <div style={{ position: 'relative', float: 'left', width: '60%' }}>
                    <i className="far fa-check green-bg" style={dashboard_message_text_i} />
                    <div style={{ width: 'calc(100% - 40px)', float: 'left' }}>
                        <p dangerouslySetInnerHTML={{ __html: notify.message }} />
                    </div>
                    {/* <p style={dashboard_message_text_p}>Your listing <a href="#">Park Central</a> has been approved! </p> */}
                </div>
                <div style={dashboard_message_time}><i className="fal fa-calendar-week" /> 28 may 2020</div>
            </div>
        </div>
    )
}

const dashboard_message_text_i = {
    float: 'left',
    width: '40px',
    height: '40px',
    lineHeight: '40px',
    color: '#fff',
    marginRight: '20px',
    borderRadius: '100%',
    boxShadow: '0 9px 16px rgb(58 87 135 / 20%)',
    textAlign: 'center',
}

const dashboard_message_text_p = {
    textAlign: 'left',
    color: '#878c9f',
    fontSize: '12px',
    lineHeight: '24px',
    position: 'relative',
    top: '8px',
    display: 'block',
    fontWeight: 500,
}

const dashboard_message_time = {
    float: 'right',
    width: '40%',
    textAlign: 'right',
    paddingRight: '70px',
    fontSize: '10px',
    color: '#7d93b2',
    position: 'relative',
    top: '14px',
}
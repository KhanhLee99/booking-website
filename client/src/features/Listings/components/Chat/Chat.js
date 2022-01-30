import React from 'react';
import PropTypes from 'prop-types';
import './Chat.scss';

Chat.propTypes = {

};

function Chat(props) {
    return (
        <div className="chat-widget_wrap not-vis-chat">
            <div className="chat-widget_header">
                <h3>Chat with  <a href="author-single.html"> Alisa Noory</a></h3>
                <div className="status st_online"><span />Online</div>
            </div>
            <div className="chat-body" data-simplebar>
                {/* message*/}
                <div className="chat-message chat-message_guest fl-wrap">
                    <div className="dashboard-message-avatar">
                        <img src="https://i.ytimg.com/vi/KhTCatAKVpk/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDp2KdTs7pYdU6qJluE2JGAzKp16Q" alt="" />
                    </div>
                    <span className="chat-message-user-name">Jessie</span>
                    <span className="massage-date">25 may 2018  <span>7.51 PM</span></span>
                    <p>Vivamus lobortis vel nibh nec maximus. Donec dolor erat, rutrum ut feugiat sed, ornare vitae nunc. </p>
                </div>
                {/* message end*/}
                {/* message*/}
                <div className="chat-message chat-message_user fl-wrap">
                    <div className="dashboard-message-avatar">
                        <img src="https://i.ytimg.com/vi/KhTCatAKVpk/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDp2KdTs7pYdU6qJluE2JGAzKp16Q" alt="" />
                    </div>
                    <span className="chat-message-user-name">Alica</span>
                    <span className="massage-date">25 may 2018  <span>7.51 PM</span></span>
                    <p>Nulla eget erat consequat quam feugiat dapibus eget sed mauris.</p>
                </div>
                {/* message end*/}
                {/* message*/}
                <div className="chat-message chat-message_guest fl-wrap">
                    <div className="dashboard-message-avatar">
                        <img src="https://i.ytimg.com/vi/KhTCatAKVpk/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDp2KdTs7pYdU6qJluE2JGAzKp16Q" alt="" />
                    </div>
                    <span className="chat-message-user-name">Jessie</span>
                    <span className="massage-date">25 may 2018  <span>7.51 PM</span></span>
                    <p>Sed non neque faucibus, condimentum lectus at, accumsan enim. Fusce pretium egestas cursus..</p>
                </div>
                {/* message end*/}
            </div>
            <div className="chat-widget_input fl-wrap">
                <textarea placeholder="Type Message" defaultValue={""} />
                <button type="submit"><i className="fal fa-paper-plane" /></button>
            </div>
        </div>

    );
}

export default Chat;
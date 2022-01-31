import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './HostMessage.scss';

HostMessage.propTypes = {

};

function HostMessage(props) {
    const { height, width } = useWindowDimensions();
    return (
        <div id='inbox-wrapper' className="dashboard-list-box fl-wrap" style={{height: height}}>
            {/* <div className="dashboard-header color-bg fl-wrap">
                <h3>Indox</h3>
            </div> */}
            <div className="chat-wrapper fl-wrap">
                <div className="row">
                    {/* chat-contacts*/}
                    <div className="col-sm-4">
                        <div className="chat-contacts fl-wrap">
                            {/* chat-contacts-item*/}
                            <UnredMessageItem />
                            <UnredMessageItem />
                            <UnredMessageItem />
                            <UnredMessageItem />
                            {/* chat-contacts-item */}
                        </div>
                    </div>
                    {/* chat-contacts end*/}
                    {/* chat-box*/}
                    <div className="col-sm-8">
                        <div className="chat-box fl-wrap">
                            <MessageGuest />
                            <MessageMe />
                            <MessageGuest />
                            <MessageMe />
                            <MessageGuest />
                            <MessageMe />
                            <MessageGuest />
                            <MessageMe />
                        </div>
                        <div className="chat-widget_input fl-wrap">
                            <textarea placeholder="Type Message" defaultValue={""} />
                            <button type="submit"><i className="fal fa-paper-plane" /></button>
                        </div>
                    </div>
                    {/* chat-box end*/}

                </div>
            </div>
            {/* dashboard-list-box end*/}
        </div>

    );
}

export default HostMessage;

function MessageMe(props) {
    return (
        <div className="chat-message chat-message_user fl-wrap">
            <div className="dashboard-message-avatar">
                <img src="https://i.ytimg.com/an_webp/lMe2Uhc5SG0/mqdefault_6s.webp?du=3000&sqp=CNXD4I8G&rs=AOn4CLBPXOcb3dCzZL5YJmZT_IMv5Cm6Sg" alt="" />
                <span className="chat-message-user-name cmun_sm">Jessie</span>
            </div>
            <span className="massage-date">25 may 2018  <span>7.51 PM</span></span>
            <p>Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat .</p>
        </div>
    )
}

function MessageGuest(props) {
    return (
        <div className="chat-message chat-message_guest fl-wrap">
            <div className="dashboard-message-avatar">
                <img src="https://i.ytimg.com/an_webp/lMe2Uhc5SG0/mqdefault_6s.webp?du=3000&sqp=CNXD4I8G&rs=AOn4CLBPXOcb3dCzZL5YJmZT_IMv5Cm6Sg" alt="" />
                <span className="chat-message-user-name cmun_sm">Andy</span>
            </div>
            <span className="massage-date">25 may 2018  <span>7.51 PM</span></span>
            <p>Vivamus lobortis vel nibh nec maximus. Donec dolor erat, rutrum ut feugiat sed, ornare vitae nunc. Donec massa nisl, bibendum id ultrices sed, accumsan sed dolor.</p>
        </div>
    )
}

function UnredMessageItem(props) {
    return (
        <a className="chat-contacts-item" href="#">
            <div className="dashboard-message-avatar">
                <img src="https://i.ytimg.com/an_webp/lMe2Uhc5SG0/mqdefault_6s.webp?du=3000&sqp=CNXD4I8G&rs=AOn4CLBPXOcb3dCzZL5YJmZT_IMv5Cm6Sg" alt="" />
            </div>
            <div className="chat-contacts-item-text">
                <h4>Cristiano Olando</h4>
                <span>27 Dec 2018 </span>
                <p>Vivamus lobortis vel nibh nec maximus. Donec dolor erat, rutrum ut feugiat sed, ornare vitae nunc. Donec massa nisl, bibendum id ultrices sed, accumsan sed dolor.</p>
            </div>
        </a>
    )


}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
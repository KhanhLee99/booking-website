import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

MessageHost.propTypes = {

};

function MessageHost(props) {
    return (
        <div id="wrapper">
            <div id="dashboard">
                <div className="dashboard-content">
                    {/* Titlebar */}
                    <div id="titlebar">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>Messages</h2>
                                {/* Breadcrumbs */}
                                <nav id="breadcrumbs">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Dashboard</a></li>
                                        <li>Messages</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/* Listings */}
                        <div className="col-lg-12 col-md-12">
                            <div className="messages-container margin-top-0">
                                <div className="messages-headline">
                                    <h4>Kathy Brown</h4>
                                    <a href="#" className="message-action"><i className="sl sl-icon-trash" /> Delete
                                        Conversation</a>
                                </div>
                                <div className="messages-container-inner">
                                    {/* Messages */}
                                    <div className="messages-inbox">
                                        <ul>
                                            <li className="active-message">
                                                <a href="dashboard-messages-conversation.html">
                                                    <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                                    <div className="message-by">
                                                        <div className="message-by-headline">
                                                            <h5>Kathy Brown</h5>
                                                            <span>2 hours ago</span>
                                                        </div>
                                                        <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                            sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                            tristique sem, eu ultricies tortor lacinia neque imperdiet
                                                            vitae...</p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboard-messages-conversation.html">
                                                    <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                                    <div className="message-by">
                                                        <div className="message-by-headline">
                                                            <h5>John Doe <i>Unread</i></h5>
                                                            <span>4 hours ago</span>
                                                        </div>
                                                        <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                            sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                            tristique sem, eu ultricies tortor lacinia neque imperdiet
                                                            vitae...</p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboard-messages-conversation.html">
                                                    <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                                    <div className="message-by">
                                                        <div className="message-by-headline">
                                                            <h5>Thomas Smith</h5>
                                                            <span>Yesterday</span>
                                                        </div>
                                                        <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                            sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                            tristique sem, eu ultricies tortor lacinia neque imperdiet
                                                            vitae...</p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboard-messages-conversation.html">
                                                    <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                                    <div className="message-by">
                                                        <div className="message-by-headline">
                                                            <h5>Mike Behringer</h5>
                                                            <span>28.06.2019</span>
                                                        </div>
                                                        <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                            sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                            tristique sem, eu ultricies tortor lacinia neque imperdiet
                                                            vitae...</p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboard-messages-conversation.html">
                                                    <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                                    <div className="message-by">
                                                        <div className="message-by-headline">
                                                            <h5>Robert Baker</h5>
                                                            <span>22.06.2019</span>
                                                        </div>
                                                        <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                            sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                            tristique sem, eu ultricies tortor lacinia neque imperdiet
                                                            vitae...</p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboard-messages-conversation.html">
                                                    <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                                    <div className="message-by">
                                                        <div className="message-by-headline">
                                                            <h5>Thomas Smith</h5>
                                                            <span>16.06.2019</span>
                                                        </div>
                                                        <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                            sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                            tristique sem, eu ultricies tortor lacinia neque imperdiet
                                                            vitae...</p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboard-messages-conversation.html">
                                                    <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                                    <div className="message-by">
                                                        <div className="message-by-headline">
                                                            <h5>Mike Behringer</h5>
                                                            <span>12.06.2019</span>
                                                        </div>
                                                        <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                            sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                            tristique sem, eu ultricies tortor lacinia neque imperdiet
                                                            vitae...</p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboard-messages-conversation.html">
                                                    <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                                    <div className="message-by">
                                                        <div className="message-by-headline">
                                                            <h5>Robert Baker</h5>
                                                            <span>31.05.2019</span>
                                                        </div>
                                                        <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                            sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                            tristique sem, eu ultricies tortor lacinia neque imperdiet
                                                            vitae...</p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboard-messages-conversation.html">
                                                    <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                                    <div className="message-by">
                                                        <div className="message-by-headline">
                                                            <h5>Thomas Smith</h5>
                                                            <span>27.05.2019</span>
                                                        </div>
                                                        <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                            sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                            tristique sem, eu ultricies tortor lacinia neque imperdiet
                                                            vitae...</p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboard-messages-conversation.html">
                                                    <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                                    <div className="message-by">
                                                        <div className="message-by-headline">
                                                            <h5>Mike Behringer</h5>
                                                            <span>24.05.2019</span>
                                                        </div>
                                                        <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                            sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                            tristique sem, eu ultricies tortor lacinia neque imperdiet
                                                            vitae...</p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboard-messages-conversation.html">
                                                    <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                                    <div className="message-by">
                                                        <div className="message-by-headline">
                                                            <h5>Robert Baker</h5>
                                                            <span>22.05.2019</span>
                                                        </div>
                                                        <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                            sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                            tristique sem, eu ultricies tortor lacinia neque imperdiet
                                                            vitae...</p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboard-messages-conversation.html">
                                                    <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                                    <div className="message-by">
                                                        <div className="message-by-headline">
                                                            <h5>Robert Baker</h5>
                                                            <span>17.05.2019</span>
                                                        </div>
                                                        <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                            sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                            tristique sem, eu ultricies tortor lacinia neque imperdiet
                                                            vitae...</p>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* Messages / End */}
                                    {/* Message Content */}
                                    <div className="message-content">
                                        <div className="message-bubble">
                                            <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                            <div className="message-text">
                                                <p>Hello, I want to talk about your great listing! Morbi velit eros,
                                                    sagittis in facilisis non, rhoncus et erat. Nam posuere tristique sem,
                                                    eu ultricies tortor lacinia neque imperdiet vitae.</p>
                                            </div>
                                        </div>
                                        <div className="message-bubble me">
                                            <div className="message-avatar"><img src="images/dashboard-avatar.jpg" alt="" />
                                            </div>
                                            <div className="message-text">
                                                <p>Nam ut hendrerit orci, ac gravida orci. Cras tristique rutrum libero at
                                                    consequat. Vestibulum vehicula neque maximus sapien iaculis, nec
                                                    vehicula sapien fringilla.</p>
                                            </div>
                                        </div>
                                        <div className="message-bubble me">
                                            <div className="message-avatar"><img src="images/dashboard-avatar.jpg" alt="" />
                                            </div>
                                            <div className="message-text">
                                                <p>Accumsan et porta ac, volutpat id ligula. Donec neque neque, blandit eu
                                                    pharetra in, tristique id enim.</p>
                                            </div>
                                        </div>
                                        <div className="message-bubble">
                                            <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                            <div className="message-text">
                                                <p>Vivamus lobortis vel nibh nec maximus. Donec dolor erat, rutrum ut
                                                    feugiat sed, ornare vitae nunc. Donec massa nisl, bibendum id ultrices
                                                    sed, accumsan sed dolor.</p>
                                            </div>
                                        </div>
                                        <div className="message-bubble me">
                                            <div className="message-avatar"><img src="images/dashboard-avatar.jpg" alt="" />
                                            </div>
                                            <div className="message-text">
                                                <p>Nunc pulvinar, velit sit amet tristique tristique, nisi odio luctus odio,
                                                    vel vulputate purus enim vestibulum est. Pellentesque non mollis ipsum,
                                                    vitae tristique sapien.</p>
                                            </div>
                                        </div>
                                        <div className="message-bubble">
                                            <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                            <div className="message-text">
                                                <p>Donec eget consequat magna. Integer luctus neque vel nulla malesuada
                                                    imperdiet. </p>
                                            </div>
                                        </div>
                                        <div className="message-bubble me">
                                            <div className="message-avatar"><img src="images/dashboard-avatar.jpg" alt="" />
                                            </div>
                                            <div className="message-text">
                                                <p>Accumsan et porta ac, volutpat id ligula. Donec neque neque, blandit eu
                                                    pharetra in, tristique id enim nulla magna interdum leo, sed tincidunt
                                                    purus elit vitae magna. Donec eget consequat magna. Integer luctus neque
                                                    vel nulla malesuada imperdiet. .</p>
                                            </div>
                                        </div>
                                        <div className="message-bubble">
                                            <div className="message-avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                            <div className="message-text">
                                                <p>Nulla eget erat consequat quam feugiat dapibus eget sed mauris.</p>
                                            </div>
                                        </div>
                                        {/* Reply Area */}
                                        <div className="clearfix" />
                                        <div className="message-reply">
                                            <textarea cols={40} rows={3} placeholder="Your Message" defaultValue={""} />
                                            <button className="button">Send Message</button>
                                        </div>
                                    </div>
                                    {/* Message Content */}
                                </div>
                            </div>
                        </div>
                        {/* Copyrights */}
                        <div className="col-md-12">
                            <div className="copyrights">© 2021 Listeo. All Rights Reserved.</div>
                        </div>
                    </div>
                </div>
                {/* Content / End */}
            </div>
            {/* Dashboard / End */}
        </div>



    );
}

export default MessageHost;
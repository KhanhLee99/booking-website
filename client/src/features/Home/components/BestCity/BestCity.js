import React from 'react';
import PropTypes from 'prop-types';
import './BestCity.scss';

BestCity.propTypes = {

};

function BestCity(props) {
    return (
        <section className="gray-bg hidden-section particles-wrapper">
            <div className="container">
                <div className="section-title">
                    <h2>Explore Best Cities</h2>
                    <div className="section-subtitle">Catalog of Categories</div>
                    <span className="section-separator" />
                    <p>In ut odio libero, at vulputate urna. Nulla tristique mi a massa convallis cursus.</p>
                </div>
                <div className="listing-item-grid_container fl-wrap">
                    <div className="row">
                        {/*  listing-item-grid  */}
                        <div className="col-sm-4">
                            <div className="listing-item-grid">
                                <div className="bg" data-bg="images/all/1.jpg"
                                    style={{ backgroundImage: "url('https://cdn.luxstay.com/home/location/location_1_1559373089.png')" }}
                                />
                                <div className="d-gr-sec" />
                                <div className="listing-counter color2-bg"><span>16 </span> Locations</div>
                                <div className="listing-item-grid_title">
                                    <h3><a href="listing.html">Hà Nội</a></h3>
                                </div>
                            </div>
                        </div>
                        {/*  listing-item-grid end  */}
                        {/*  listing-item-grid  */}
                        <div className="col-sm-4">
                            <div className="listing-item-grid">
                                <div className="bg" data-bg="images/all/1.jpg"
                                    style={{ backgroundImage: "url('https://i.ytimg.com/vi/dLQe4qEfVJw/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDVXufbLIXUKZ2teIzQPqbQhrXgRA')" }}
                                />
                                <div className="d-gr-sec" />
                                <div className="listing-counter color2-bg"><span>22 </span> Locations</div>
                                <div className="listing-item-grid_title">
                                    <h3><a href="listing.html">Nha Trang</a></h3>
                                </div>
                            </div>
                        </div>
                        {/*  listing-item-grid end  */}
                        {/*  listing-item-grid  */}
                        <div className="col-sm-4">
                            <div className="listing-item-grid">
                                <div className="bg" data-bg="images/all/1.jpg"
                                    style={{ backgroundImage: "url('https://i.ytimg.com/vi/dLQe4qEfVJw/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDVXufbLIXUKZ2teIzQPqbQhrXgRA')" }}
                                />
                                <div className="d-gr-sec" />
                                <div className="listing-counter color2-bg"><span>9 </span> Locations</div>
                                <div className="listing-item-grid_title">
                                    <h3><a href="listing.html">Vũng Tàu</a></h3>
                                </div>
                            </div>
                        </div>
                        {/*  listing-item-grid end  */}
                        {/*  listing-item-grid  */}
                        <div className="col-sm-4">
                            <div className="listing-item-grid">
                                <div className="bg" data-bg="images/all/1.jpg"
                                    style={{ backgroundImage: "url('https://cdn.luxstay.com/home/location/location_4_1559786177.png')" }}
                                />
                                <div className="d-gr-sec" />
                                <div className="listing-counter color2-bg"><span>12 </span> Locations</div>
                                <div className="listing-item-grid_title">
                                    <h3><a href="listing.html">Đà Lạt</a></h3>
                                </div>
                            </div>
                        </div>
                        {/*  listing-item-grid end  */}
                        {/*  listing-item-grid  */}
                        <div className="col-sm-8">
                            <div className="listing-item-grid">
                                <div className="bg" data-bg="https://i.ytimg.com/vi/dLQe4qEfVJw/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDVXufbLIXUKZ2teIzQPqbQhrXgRA"
                                    style={{ backgroundImage: "url('https://cdn.luxstay.com/home/location/location_5_1559786196.png')" }}
                                />
                                <div className="d-gr-sec" />
                                <div className="listing-counter color2-bg"><span>33 </span> Locations</div>
                                <div className="listing-item-grid_title">
                                    <h3><a href="listing.html">Đà Nẵng</a></h3>
                                </div>
                            </div>
                        </div>
                        {/*  listing-item-grid end  */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BestCity;
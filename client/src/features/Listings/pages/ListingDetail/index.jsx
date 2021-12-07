import React from 'react';
import PropTypes from 'prop-types';
import TabHorizontal from '../../components/TabHorizontal';
import Header from '../../../../components/Header';
import Photos from '../../components/Photos';
import BoxBooking from '../../components/BoxBooking';

ListingDetail.propTypes = {

};

function ListingDetail(props) {
    return (
        <div id="page" className="theia-exception">
            <Header />
            <main>
                <Photos />
                <div className="bg_color_1">
                    <TabHorizontal />
                    <div className="container margin_60_35">
                        <div className="row">
                            <div className="col-lg-8">
                                <section id="description">
                                    <h2>Description</h2>
                                    <p>Per consequat adolescens ex, cu nibh commune <strong>temporibus vim</strong>, ad sumo
                                        viris eloquentiam sed. Mea appareat omittantur eloquentiam ad, nam ei quas oportere
                                        democritum. Prima causae admodum id est, ei timeam inimicus sed. Sit an meis
                                        aliquam, cetero inermis vel ut. An sit illum euismod facilisis, tamquam vulputate
                                        pertinacia eum at.</p>
                                    <p>Cum et probo menandri. Officiis consulatu pro et, ne sea sale invidunt, sed ut sint
                                        <strong>blandit</strong> efficiendi. Atomorum explicari eu qui, est enim quaerendum
                                        te. Quo harum viris id. Per ne quando dolore evertitur, pro ad cibo commune.</p>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <ul className="bullets">
                                                <li>Dolorem mediocritatem</li>
                                                <li>Mea appareat</li>
                                                <li>Prima causae</li>
                                                <li>Singulis indoctum</li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <ul className="bullets">
                                                <li>Timeam inimicus</li>
                                                <li>Oportere democritum</li>
                                                <li>Cetero inermis</li>
                                                <li>Pertinacia eum</li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* /row */}
                                    <hr />
                                    <h3>Instagram photos feed</h3>
                                    <div id="instagram-feed-hotel" className="clearfix" />
                                    <hr />
                                    <div className="room_type first">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img src="img/gallery/hotel_list_1.jpg" className="img-fluid" alt="" />
                                            </div>
                                            <div className="col-md-8">
                                                <h4>Single Room</h4>
                                                <p>Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod
                                                    facilisis, tamquam vulputate pertinacia eum at.</p>
                                                <ul className="hotel_facilities">
                                                    <li><img src="img/hotel_facilites_icon_2.svg" alt="" />Single Bed</li>
                                                    <li><img src="img/hotel_facilites_icon_4.svg" alt="" />Free Wifi</li>
                                                    <li><img src="img/hotel_facilites_icon_5.svg" alt="" />Shower</li>
                                                    <li><img src="img/hotel_facilites_icon_7.svg" alt="" />Air Condition</li>
                                                    <li><img src="img/hotel_facilites_icon_8.svg" alt="" />Hairdryer</li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* /row */}
                                    </div>
                                    {/* /rom_type */}
                                    <div className="room_type gray">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img src="img/gallery/hotel_list_2.jpg" className="img-fluid" alt="" />
                                            </div>
                                            <div className="col-md-8">
                                                <h4>Double Room</h4>
                                                <p>Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod
                                                    facilisis, tamquam vulputate pertinacia eum at.</p>
                                                <ul className="hotel_facilities">
                                                    <li><img src="img/hotel_facilites_icon_3.svg" alt="" />Double Bed</li>
                                                    <li><img src="img/hotel_facilites_icon_4.svg" alt="" />Free Wifi</li>
                                                    <li><img src="img/hotel_facilites_icon_6.svg" alt="" />Bathtub</li>
                                                    <li><img src="img/hotel_facilites_icon_7.svg" alt="" />Air Condition</li>
                                                    <li><img src="img/hotel_facilites_icon_8.svg" alt="" />Hairdryer</li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* /row */}
                                    </div>
                                    {/* /rom_type */}
                                    <div className="room_type last">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img src="img/gallery/hotel_list_3.jpg" className="img-fluid" alt="" />
                                            </div>
                                            <div className="col-md-8">
                                                <h4>Suite Room</h4>
                                                <p>Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod
                                                    facilisis, tamquam vulputate pertinacia eum at.</p>
                                                <ul className="hotel_facilities">
                                                    <li><img src="img/hotel_facilites_icon_3.svg" alt="" />King size Bed</li>
                                                    <li><img src="img/hotel_facilites_icon_4.svg" alt="" />Free Wifi</li>
                                                    <li><img src="img/hotel_facilites_icon_6.svg" alt="" />Bathtub</li>
                                                    <li><img src="img/hotel_facilites_icon_7.svg" alt="" />Air Condition</li>
                                                    <li><img src="img/hotel_facilites_icon_9.svg" alt="" />Swimming pool</li>
                                                    <li><img src="img/hotel_facilites_icon_3.svg" alt="" />Hairdryer</li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* /row */}
                                    </div>
                                    {/* /rom_type */}
                                    <hr />
                                    <h3>Location</h3>
                                    <div id="map" className="map map_single add_bottom_30" />
                                    {/* End Map */}
                                </section>
                                {/* /section */}

                            </div>
                            <BoxBooking 
                                class='right'
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );
}

export default ListingDetail;
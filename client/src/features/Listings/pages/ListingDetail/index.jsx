import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TabHorizontal from '../../components/TabHorizontal';
import Header from '../../../../components/Header';
import Photos from '../../components/Photos';
import BoxBooking from '../../components/BoxBooking';
import { useParams } from 'react-router';
import listingApi from '../../../../api/listingApi';
import Header2 from '../../../../components/Header/Header2/Header2';
import './styles.scss';

ListingDetail.propTypes = {

};

function ListingDetail(props) {

    const { id } = useParams();
    const [listingDetail, setListingDetail] = useState({});

    useEffect(() => {
        const fetchListingDetail = async () => {
            const res = await listingApi.getListingById(id);
            setListingDetail(res.data.listing);
        }

        fetchListingDetail();
    }, []);

    return (
        // <div id="page" className="theia-exception">
        //     <Header />
        //     <main>
        //         <Photos />
        //         <div className="bg_color_1">
        //             <TabHorizontal />
        //             <div className="container margin_60_35">
        //                 <div className="row">
        //                     <div className="col-lg-8">
        //                         {/* /section */}

        //                     </div>
        //                     <BoxBooking
        //                         className='right'
        //                         listingDetail={listingDetail}
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //     </main>
        // </div>
        <>
            <div id="wrapper">
                {/* <Header2 /> */}
                <div className="clearfix" />
                <Photos />
                <div className="container">
                    <div className="row sticky-wrapper">
                        <div className="col-lg-8 col-md-8 padding-right-30">
                            {/* Titlebar */}
                            <div id="titlebar" className="listing-titlebar">
                                <div className="listing-titlebar-title">
                                    <h2>Joe's Photography Inc.</h2>
                                    <span>
                                        <a href="#listing-location" className="listing-address">
                                            <i className="fa fa-map-marker" />
                                            2726 Shinn Street, New York
                                        </a>
                                    </span>
                                    <p>Phòng riêng · 1 Phòng tắm · 1 giường · 1 phòng ngủ · 2 khách (tối đa 3 khách)</p>
                                </div>
                            </div>
                            {/* Listing Nav */}
                            <div id="listing-nav" className="listing-nav-container">
                                <ul className="listing-nav">
                                    <li><a href="#listing-overview" className="active">Tổng quan</a></li>
                                    <li><a href="#listing-pricing-list">Tiện nghi</a></li>
                                    <li><a href="#listing-location">Giá phòng</a></li>
                                    <li><a href="#listing-reviews">Đánh giá</a></li>
                                    <li><a href="#add-review">Vị trí</a></li>
                                </ul>
                            </div>
                            {/* Overview */}
                            <div id="listing-overview" className="listing-section">
                                {/* Description */}
                                <h3 className="listing-desc-headline">Overview</h3>
                                <p>
                                    Ut euismod ultricies sollicitudin. Curabitur sed dapibus nulla. Nulla eget iaculis lectus.
                                    Mauris ac maximus neque. Nam in mauris quis libero sodales eleifend. Morbi varius, nulla sit
                                    amet rutrum elementum, est elit finibus tellus, ut tristique elit risus at metus.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla
                                    finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus
                                    suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla
                                    diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a
                                    consequat purus viverra.
                                </p>
                                {/* Listing Contacts */}

                                <div className="clearfix" />
                                <div className="_npr0qi" style={{ borderTopColor: 'rgb(221, 221, 221)' }} />

                                {/* Amenities */}
                                <h3 className="listing-desc-headline">Amenities</h3>
                                <p>Giới thiệu về các tiện nghi và dịch vụ tại nơi lưu trú</p>
                                <h4 className='mt-5 mb-4'>Tiện ích</h4>
                                <ul className="listing-features checkboxes margin-top-0">
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Elevator</li>
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Friendly workspace</li>
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Book</li>
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Internet</li>
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Free parking</li>
                                </ul>
                                <h4 className='mt-5 mb-4'>Tiện ích</h4>
                                <ul className="listing-features checkboxes margin-top-0">
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Elevator</li>
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Friendly workspace</li>
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Book</li>
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Internet</li>
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Free parking</li>
                                </ul>
                                <h4 className='mt-5 mb-4'>Tiện ích</h4>
                                <ul className="listing-features checkboxes margin-top-0">
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Elevator</li>
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Friendly workspace</li>
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Book</li>
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Internet</li>
                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>Free parking</li>
                                </ul>
                            </div>

                            <div className="_npr0qi" style={{ borderTopColor: 'rgb(221, 221, 221)' }} />

                            {/* Food Menu */}
                            <div id="listing-pricing-list" className="listing-section">
                                <h3 className="listing-desc-headline margin-top-70 margin-bottom-30">Pricing</h3>
                                <p>Giá có thể tăng vào cuối tuần hoặc ngày lễ</p>
                                <div className="pricing-list-container">
                                    {/* Food List */}
                                    <ul>
                                        <li>
                                            <p>Thứ hai - Thứ năm</p>
                                            <span>850,000₫</span>
                                        </li>
                                        <li>
                                            <p>Thứ sáu - Chủ nhật</p>
                                            <span>900,000₫</span>
                                        </li>
                                        <li>
                                            <p>Phí trẻ em tăng thêm</p>
                                            <span>125,000₫ (sau 2 khách)</span>
                                        </li>
                                        <li>
                                            <p>Thuê theo tháng</p>
                                            <span>-7.88 %</span>
                                        </li>
                                        <li>
                                            <p>Số đêm tối thiểu</p>
                                            <span>1 đêm</span>
                                        </li>
                                        <li>
                                            <p>Số đêm tối đa</p>
                                            <span>90 đêm</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* Food Menu / End */}

                            <div className="_npr0qi" style={{ borderTopColor: 'rgb(221, 221, 221)' }} />

                            {/* Location */}
                            <div id="listing-location" className="listing-section">
                                <h3 className="listing-desc-headline margin-top-60 margin-bottom-30">Location</h3>
                                <div id="singleListingMap-container">
                                    <div id="singleListingMap" data-latitude="40.70437865245596" data-longitude="-73.98674011230469" data-map-icon="im im-icon-Hamburger" />
                                    <a href="#" id="streetView">Street View</a>
                                </div>
                            </div>

                            <div className="_npr0qi" style={{ borderTopColor: 'rgb(221, 221, 221)' }} />

                            {/* Reviews */}
                            <div id="listing-reviews" className="listing-section">
                                <div className="star-rating" data-rating="3.5">
                                    <h3 className="listing-desc-headline margin-top-75 margin-bottom-20"><span className="star"></span>4,89 <span>(12 đánh giá)</span></h3>
                                </div>

                                {/* Rating Overview */}
                                <div className="rating-overview">
                                    <div className="rating-bars">
                                        <div className="rating-bars-item">
                                            <span className="rating-bars-name">Service</span>
                                            <span className="rating-bars-inner">
                                                <span className="rating-bars-rating" data-rating="4.2">
                                                    <span className="rating-bars-rating-inner" />
                                                </span>
                                                <strong>4.2</strong>
                                            </span>
                                        </div>
                                        <div className="rating-bars-item">
                                            <span className="rating-bars-name">Value for Money</span>
                                            <span className="rating-bars-inner">
                                                <span className="rating-bars-rating" data-rating="2.8">
                                                    <span className="rating-bars-rating-inner" />
                                                </span>
                                                <strong>2.8</strong>
                                            </span>
                                        </div>
                                        <div className="rating-bars-item">
                                            <span className="rating-bars-name">Location</span>
                                            <span className="rating-bars-inner">
                                                <span className="rating-bars-rating" data-rating="3.7">
                                                    <span className="rating-bars-rating-inner" />
                                                </span>
                                                <strong>3.7</strong>
                                            </span>
                                        </div>
                                        <div className="rating-bars-item">
                                            <span className="rating-bars-name">Cleanliness</span>
                                            <span className="rating-bars-inner">
                                                <span className="rating-bars-rating" data-rating={4.0}>
                                                    <span className="rating-bars-rating-inner" />
                                                </span>
                                                <strong>4.5</strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Rating Overview / End */}
                                <div className="clearfix" />
                                {/* Reviews */}
                                <section className="comments listing-reviews">
                                    <ul>
                                        <li>
                                            <div className="avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /> </div>
                                            <div className="comment-content">
                                                <div className="arrow-comment" />
                                                <div className="comment-by">John Doe<span className="date">May 2019</span>
                                                    <div className="star-rating" data-rating={4} />
                                                </div>
                                                <p>Commodo est luctus eget. Proin in nunc laoreet justo volutpat blandit enim.
                                                    Sem felis, ullamcorper vel aliquam non, varius eget justo. Duis quis nunc
                                                    tellus sollicitudin mauris.
                                                    Commodo est luctus eget. Proin in nunc laoreet justo volutpat blandit enim.
                                                    Sem felis, ullamcorper vel aliquam non, varius eget justo. Duis quis nunc
                                                    tellus sollicitudin mauris.</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /></div>
                                            <div className="comment-content">
                                                <div className="arrow-comment" />
                                                <div className="comment-by">Kathy Brown<span className="date">June 2019</span>
                                                    <div className="star-rating" data-rating={5} />
                                                </div>
                                                <p>Morbi velit eros, sagittis in facilisis non, rhoncus et erat. Nam posuere
                                                    tristique sem, eu ultricies tortor imperdiet vitae. Curabitur lacinia neque
                                                    non metus</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /> </div>
                                            <div className="comment-content">
                                                <div className="arrow-comment" />
                                                <div className="comment-by">John Doe<span className="date">May 2019</span>
                                                    <div className="star-rating" data-rating={5} />
                                                </div>
                                                <p>Commodo est luctus eget. Proin in nunc laoreet justo volutpat blandit enim.
                                                    Sem felis, ullamcorper vel aliquam non, varius eget justo. Duis quis nunc
                                                    tellus sollicitudin mauris.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                            {/* Add Review Box */}

                            {/* Add Review Box / End */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <LoginPopup
                trigger={triggerPopup}
                setTriggerPopup={setTriggerPopup}
            /> */}
        </>
    );
}

export default ListingDetail;
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
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ListReview from '../../components/ListReview';

ListingDetail.propTypes = {

};

function ListingDetail(props) {
    const [loadingListingDetail, setLoadingListingDetail] = useState(false);
    const { id } = useParams();
    const [listingDetail, setListingDetail] = useState({});
    const [amenities, setAmenities] = useState([])
    const [photos, setPhotos] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchListingDetail = async () => {
            setLoadingListingDetail(true)
            await listingApi.getListingById(id).then(res => {
                setListingDetail(res.data.listing);
                setAmenities(res.data.amenities);
                setPhotos(res.data.photos);
                setReviews(res.data.reviews);
                setLoadingListingDetail(false)
            });
        }

        fetchListingDetail();
    }, []);

    return (
        <div id="wrapper">
            <Header />
            <div className="clearfix" />
            {
                loadingListingDetail ? <Skeleton height={400} style={{ marginTop: '80px' }} /> :
                    <Photos photos={photos} />
            }


            <div className="container">
                <div className="row sticky-wrapper">
                    <div className="col-lg-8 col-md-8 padding-right-30">
                        {
                            loadingListingDetail ? <div className='margin-top-75'>
                                <h2><Skeleton width={"100%"} count={2} /></h2>
                                <a><Skeleton width={"40%"} /></a>
                                <p><Skeleton width={"70%"} /></p>
                                <div><Skeleton width={"70%"} /></div>
                                <h3 className="listing-desc-headline"><Skeleton width={"40%"} /></h3>
                                <p><Skeleton /></p>
                            </div> : <>
                                <div id="titlebar" className="listing-titlebar">
                                    <div className="listing-titlebar-title">
                                        <h2>{listingDetail.name}</h2>
                                        <span>
                                            <a href="#listing-location" className="listing-address">
                                                <i className="fa fa-map-marker" />{listingDetail.street_address}
                                            </a>
                                        </span>
                                        <p>{listingDetail.rental_form === 'shared_room' ? 'Phòng chung' : listingDetail.rental_form === 'private_room' ? 'Phòng riêng' : 'Toàn bộ nhà'} · {listingDetail.bathroom_count} Phòng tắm · {listingDetail.bed_count} giường · {listingDetail.bedroom_count} phòng ngủ · {listingDetail.standard_guest_count} khách</p>
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
                                    <p dangerouslySetInnerHTML={{ __html: listingDetail.description }} />
                                    {/* Listing Contacts */}

                                    <div className="clearfix" />
                                    <div className="_npr0qi" style={{ borderTopColor: 'rgb(221, 221, 221)' }} />

                                    {/* Amenities */}
                                    <h3 className="listing-desc-headline">Amenities</h3>
                                    <p>Giới thiệu về các tiện nghi và dịch vụ tại nơi lưu trú</p>
                                    {
                                        amenities.map((item, index) => {
                                            return (
                                                <>
                                                    <h4 className='mt-5 mb-4'>{item.amenity_type}</h4>
                                                    <ul className="listing-features checkboxes margin-top-0">
                                                        {
                                                            item.amenities.map((amenity, index) => {
                                                                return (
                                                                    <li><i className="im im-icon-Basket-Coins k-icon"></i>{amenity.name}</li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </>
                                            )
                                        })
                                    }
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
                                                <span>{parseInt(listingDetail.price_per_night_base).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                            </li>
                                            <li>
                                                <p>Thứ sáu - Chủ nhật</p>
                                                <span>{parseInt(listingDetail.price_per_night_weekend).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                            </li>
                                            {/* <li>
                                                    <p>Phí trẻ em tăng thêm</p>
                                                    <span>125,000₫ (sau 2 khách)</span>
                                                </li> */}
                                            <li>
                                                <p>Thuê theo tháng</p>
                                                <span>-{listingDetail.discount_monthly} %</span>
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
                                <ListReview reviews={reviews} />
                            </>
                        }
                    </div>
                    <BoxBooking
                        loadingListingDetail={loadingListingDetail}
                        listingDetail={listingDetail}
                    />

                </div>
            </div>
        </div>
    );
}

export default ListingDetail;
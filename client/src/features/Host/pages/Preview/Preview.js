import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import listingApi from '../../../../api/listingApi';
import { useParams } from 'react-router-dom';
import CommonAddListing from '../../../../components/CommonAddListing/CommonAddListing';
import TabAddListing from '../../components/TabAddListing/TabAddListing';
import { HeaderAddListing } from '../../components/HeaderHost';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Photos from '../../../Listings/components/Photos';
import { title } from '../../../Listings/pages/ListingDetail';
import AmenityDetail from '../../../Listings/components/AmenityDetail/AmenityDetail';

Preview.propTypes = {

};

function Preview(props) {
    const { id } = useParams();
    const [listingDetail, setListingDetail] = useState({});
    const [amenities, setAmenities] = useState([])
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchListingDetail = async () => {
            await listingApi.getListingPreview(id).then(res => {
                setListingDetail(res.data.data.listing);
                setAmenities(res.data.data.amenities);
                setPhotos(res.data.data.photos);
            });
        }

        fetchListingDetail();

        window.scrollTo(0, 0)


        return () => {
        }
    }, []);
    return (
        <div id="wrapper listing-detail" style={{ backgroundColor: '#fff', maxWidth: '100%', overflowX: 'hidden' }}>
            <HeaderAddListing />
            <TabAddListing
                id={id}
                preview={true}
            />

            <div className="clearfix" />
            {
                loading ? <Skeleton height={400} style={{ marginTop: '80px' }} /> :
                    <Photos photos={photos} />
            }

            <div className="container">
                <div className="row sticky-wrapper">
                    <div className="col-lg-8 col-md-8 padding-right-30">
                        {
                            loading ? <div className='margin-top-75'>
                                <h2><Skeleton width={"100%"} count={2} /></h2>
                                <a><Skeleton width={"40%"} /></a>
                                <p><Skeleton width={"70%"} /></p>
                                <div><Skeleton width={"70%"} /></div>
                                <h3 className="listing-desc-headline"><Skeleton width={"40%"} /></h3>
                                <p><Skeleton /></p>
                            </div> : <>
                                <div id="titlebar" className="listing-titlebar" style={{ paddingBottom: 0 }}>
                                    <div className="listing-titlebar-title">
                                        <h2 style={{ fontWeight: 600, color: '#566985', paddingBottom: 8 }}>{listingDetail.name}</h2>
                                        <span>
                                            <a href="#" className="listing-address">
                                                <i className="fas fa-map-marker-alt" style={{ color: '#4DB7FE', fontSize: 12 }} />{listingDetail.street_address}
                                            </a>
                                        </span>
                                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#878c9f' }}>{listingDetail.rental_form === 'shared_room' ? 'Phòng chung' : listingDetail.rental_form === 'private_room' ? 'Phòng riêng' : 'Toàn bộ nhà'} · {listingDetail.bathroom_count} Phòng tắm · {listingDetail.bed_count} giường · {listingDetail.bedroom_count} phòng ngủ · {listingDetail.standard_guest_count} khách</p>
                                    </div>
                                </div>

                                {/* Overview */}
                                <div id="listing-overview" className="listing-section">
                                    {/* Description */}
                                    <h3 className="listing-desc-headline" style={title}>Overview</h3>
                                    <p dangerouslySetInnerHTML={{ __html: listingDetail.description }} className='listing-overview' />

                                    <div className="clearfix" />
                                    <div className="_npr0qi" style={{ borderTopColor: 'rgb(221, 221, 221)' }} />

                                    {/* Amenities */}
                                    <h3 className="listing-desc-headline" style={title}>Amenities</h3>
                                    <p className='listing-overview'>Giới thiệu về các tiện nghi và dịch vụ tại nơi lưu trú</p>
                                    {
                                        amenities.map((item, index) => {
                                            return (
                                                <AmenityDetail
                                                    key={index}
                                                    item={item}
                                                    title={title}
                                                />
                                            )
                                        })
                                    }
                                </div>

                                <div className="_npr0qi" style={{ borderTopColor: 'rgb(221, 221, 221)' }} />

                                {/* Food Menu */}
                                <div id="listing-pricing-list" className="listing-section">
                                    <h3 className="listing-desc-headline" style={title}>Pricing</h3>
                                    <p className='listing-overview'>Giá có thể tăng vào cuối tuần hoặc ngày lễ</p>
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
                                {/* <div id="listing-location" className="listing-section">
                                    <h3 className="listing-desc-headline" style={title}>Location</h3>
                                    <div id="singleListingMap-container">
                                        <div id="singleListingMap" data-latitude="40.70437865245596" data-longitude="-73.98674011230469" data-map-icon="im im-icon-Hamburger" />
                                        <a href="#" id="streetView">Street View</a>
                                    </div>
                                </div>

                                <div className="_npr0qi" style={{ borderTopColor: 'rgb(221, 221, 221)' }} /> */}

                                {/* Reviews */}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preview;
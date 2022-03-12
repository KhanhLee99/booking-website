import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import listingApi from '../../../../api/listingApi';
import { useHistory, useParams } from 'react-router-dom';
import CommonAddListing from '../../../../components/CommonAddListing/CommonAddListing';
import TabAddListing from '../../components/TabAddListing/TabAddListing';
import { HeaderAddListing } from '../../components/HeaderHost';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Photos from '../../../Listings/components/Photos';
import { title } from '../../../Listings/pages/ListingDetail';
import AmenityDetail from '../../../Listings/components/AmenityDetail/AmenityDetail';
import FooterHost from '../../components/FooterHost';
import hostApi from '../../../../api/hostApi';
import { alertSendListingSuccess } from '../../../../@helper/alertComfirm';
import { parseVNDCurrency } from '../../../../@helper/helper';

Preview.propTypes = {

};

function Preview(props) {
    const history = useHistory();
    const { id } = useParams();
    const [listingDetail, setListingDetail] = useState({});
    const [amenities, setAmenities] = useState([])
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [percent, setPercent] = useState(100 / 7 * 6);

    const handleNext = async () => {
        try {
            setLoading(true);
            await hostApi.sendListing(id).then(res => {
                setLoading(false);
                alertSendListingSuccess('Success', 'Please wait for us to verify your listing. Thank you', () => history.push('/host/listings'))
            });
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    }

    const handleBack = () => {
        history.push(`/become-host/${id}/price`);
    }

    useEffect(() => {
        const fetchListingDetail = async () => {
            setLoading(true);
            await listingApi.getListingPreview(id).then(res => {
                setListingDetail(res.data.data.listing);
                setAmenities(res.data.data.amenities);
                setPhotos(res.data.data.photos);
                setLoading(false);
            }).catch(err => {
                console.log(err.message);
                setLoading(false);
            });
        }

        fetchListingDetail();

        window.scrollTo(0, 0);
        setPercent(100 / 7 * 7)

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
                                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#878c9f' }}>{listingDetail.rental_form === 'shared_room' ? 'Phòng chung' : listingDetail.rental_form === 'private_room' ? 'Phòng riêng' : 'Toàn bộ nhà'} · {listingDetail.bathroom_count} Phòng tắm · {listingDetail.bed_count} giường · {listingDetail.bedroom_count} bedrooms · {listingDetail.standard_guest_count} khách</p>
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
                                    <p className='listing-overview'>About the property's amenities and services.</p>
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
                                    <p className='listing-overview'>Prices may increase on weekends or holidays.</p>
                                    <div className="pricing-list-container">
                                        {/* Food List */}
                                        <ul>
                                            <li>
                                                <p>Monday - Friday</p>
                                                <span>{parseVNDCurrency(listingDetail.price_per_night_base)}</span>
                                            </li>
                                            <li>
                                                <p>Saturday - Sunday</p>
                                                <span>{parseVNDCurrency(listingDetail.price_per_night_weekend)}</span>
                                            </li>
                                            {parseFloat(listingDetail.discount_monthly) > 0 && <li>
                                                <p>Monthly Discount</p>
                                                <span>-{listingDetail.discount_monthly} %</span>
                                            </li>}
                                            {parseFloat(listingDetail.discount_weekly) > 0 && <li>
                                                <p>Weekly Discount</p>
                                                <span>-{listingDetail.discount_weekly} %</span>
                                            </li>}
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
                                */}
                            </>
                        }
                    </div>
                </div>
            </div>
            <FooterHost
                loading={loading}
                handleBack={handleBack}
                handleNext={handleNext}
                hiddenBackButton={false}
                isHandleClick={true}
                now={percent}
                title='Send Listing'
            />
        </div>
    );
}

export default Preview;
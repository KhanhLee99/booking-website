import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getDaysArray, parseVNDCurrency } from '../../../../@helper/helper';
import blockBookingApi from '../../../../api/blockBookingApi';
import conversationApi from '../../../../api/conversationApi';
import listingApi from '../../../../api/listingApi';
import reservationApi from '../../../../api/reservationApi';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import Loading from '../../../../components/Loading/Loading';
import AmenityDetail from '../../components/AmenityDetail/AmenityDetail';
import BoxBooking from '../../components/BoxBooking';
import Chat from '../../components/Chat/Chat';
import ListReview from '../../components/ListReview';
import Photos from '../../components/Photos';
import TabHorizontal from '../../components/TabHorizontal';
import './styles.scss';
import { useHistory } from 'react-router-dom';

ListingDetail.propTypes = {

};

export const title = {
    textAlign: 'left',
    fontSize: '18px',
    fontWeight: 600,
    color: '#566985',
    fontFamily: "'Nunito', sans-serif",
}



function ListingDetail(props) {
    const { id } = useParams();
    const history = useHistory();

    const messagesEndRef = useRef(null);

    const loggedInUser = useSelector((state) => state.userSlice.current);
    const isLoggedIn = !!loggedInUser.id;
    const [loadingListingDetail, setLoadingListingDetail] = useState(false);
    const [listingDetail, setListingDetail] = useState({});
    const [host, setHost] = useState({});
    const [amenities, setAmenities] = useState([])
    const [photos, setPhotos] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [date, setDate] = useState(moment(moment().toDate()).format('YYYY-MM-DD'));
    const [reservationDate, setReservationDate] = useState([])
    const [blockList, setBlockList] = useState([]);
    const [saved, setSaved] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [rating, setRating] = useState(0);

    const handleSave = async () => {
        if (isLoggedIn) {
            const params = {
                listing_id: id,
                user_id: loggedInUser.id
            }
            setLoadingListingDetail(true);
            await listingApi.favoriteListing(params).then(res => {
                setSaved(!saved);
                setLoadingListingDetail(false);
            });
        }
    }

    const fetchReservation = async () => {
        try {
            const params = {
                month: date
            }
            // setLoading(true);
            await reservationApi.getReservationInMonth(id, params).then(res => {
                let tmp = [];
                res.data.data.forEach(item => tmp = tmp.concat(getDaysArray(new Date(item.checkin_date), new Date(item.checkout_date))));
                setReservationDate(tmp);
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    const getBlockInMonth = async () => {
        try {
            const params = {
                month: date
            }
            await blockBookingApi.getBlockInMonth(id, params).then(res => {
                let tmp = [];
                res.data.data.forEach(item => tmp = tmp.concat(getDaysArray(new Date(item.start_date), new Date(item.end_date))));
                setBlockList(tmp);
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    const getConversationTogether = async () => {
        try {
            const params = {
                host_id: listingDetail.user_id
            }
            await conversationApi.getConversationTogether({ params }).then(res => {
                setConversation(res.data.conversation);
                setCurrentConversationId(res.data.conversation_id);
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    const sendMessage = async (values, resetForm) => {
        try {
            const params = {
                message: values.message,
                conversation_id: currentConversationId,
            }
            await conversationApi.sendMessage(params).then(res => {
                const newMessage = {
                    id: loggedInUser.id,
                    name: loggedInUser.name,
                    avatar: loggedInUser.avatar,
                    message: values.message,
                    time: Date.now(),
                    isMe: 1,
                }
                setConversation(oldState => [...oldState, newMessage]);
                resetForm();
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        const checkListing = async () => {
            try {
                await listingApi.checkListing(id).then(res => {

                }).catch(err => {
                    history.push('/error');
                })
            } catch (err) {
                console.log(err.message);
            }
        }
        const fetchListingDetail = async () => {
            setLoadingListingDetail(true)
            await listingApi.getListingById(id).then(res => {
                setListingDetail(res.data.data.listing);
                setHost(res.data.data.host);
                setAmenities(res.data.data.amenities);
                setPhotos(res.data.data.photos);
                setReviews(res.data.data.reviews);
                setSaved(res.data.data.saved);
                setRating(res.data.data.rating);
                setLoadingListingDetail(false)
            });
        }

        checkListing();
        fetchListingDetail();
        fetchReservation();
        getBlockInMonth();

        window.scrollTo(0, 0)

        return () => {
            setReservationDate([]);
            setBlockList([]);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn && listingDetail.user_id) {
            getConversationTogether();
        }
    }, [listingDetail]);

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current.scrollIntoView();
        }
        scrollToBottom();
    }, [conversation]);

    return (
        <div id="wrapper listing-detail" style={{ backgroundColor: '#fff', maxWidth: '100%', overflowX: 'hidden' }}>
            {loadingListingDetail && <Loading />}
            <Header />

            <div className="clearfix" />
            {
                loadingListingDetail ? <Skeleton height={400} style={{ marginTop: '80px' }} /> :
                    <Photos photos={photos} />
            }

            <TabHorizontal
                isLoggedIn={isLoggedIn}
                saved={saved}
                handleSave={handleSave}
            />

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
                                <div id="titlebar" className="listing-titlebar" style={{ paddingBottom: 0 }}>
                                    <div className="listing-titlebar-title">
                                        <h2 style={{ fontWeight: 600, color: '#566985', paddingBottom: 8 }}>{listingDetail.name}</h2>
                                        <span>
                                            <a href="#" className="listing-address">
                                                <i className="fas fa-map-marker-alt" style={{ color: '#4DB7FE', fontSize: 12 }} />{listingDetail.street_address}
                                            </a>
                                        </span>
                                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#878c9f' }}>{listingDetail.rental_form === 'shared_room' ? 'Shared room' : listingDetail.rental_form === 'private_room' ? 'Private room' : 'Entire place'} · {listingDetail.bathroom_count} bathrooms · {listingDetail.bed_count} beds · {listingDetail.bedroom_count} bedrooms · {listingDetail.standard_guest_count} guests</p>
                                    </div>
                                </div>

                                {/* Overview */}
                                <div id="listing-overview" className="listing-section">
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


                                <div id="listing-pricing-list" className="listing-section">
                                    <h3 className="listing-desc-headline" style={title}>Pricing</h3>
                                    <p className='listing-overview'>Prices may increase on weekends or holidays.</p>
                                    <div className="pricing-list-container">
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

                                <div className="_npr0qi" style={{ borderTopColor: 'rgb(221, 221, 221)' }} />

                                <ListReview
                                    reviews={reviews}
                                    rating={rating}
                                    title={title}
                                />
                            </>
                        }
                    </div>

                    <BoxBooking
                        loadingListingDetail={loadingListingDetail}
                        listingDetail={listingDetail}
                        host={host}
                        reservationDate={reservationDate}
                        blockList={blockList}
                    />

                </div>
            </div>
            <div className="chat-widget-button cwb tolt" data-microtip-position="left" data-tooltip="Chat With Owner"
                onClick={() => { setShowChat(!showChat); }}
            >
                <i className="fal fa-comments-alt" />
            </div>

            <Chat
                sendMessage={sendMessage}
                conversation={conversation}
                style={{ display: showChat ? 'block' : 'none' }}
                ref={messagesEndRef}
            />
            <Footer />
        </div>
    );
}

export default ListingDetail;
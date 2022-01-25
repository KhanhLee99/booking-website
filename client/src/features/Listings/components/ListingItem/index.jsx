import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import listingApi from '../../../../api/listingApi';
import LoginModal from '../../../../components/LoginModal/LoginModal';
import ThumbListingPlaceholder from '../../../../components/Placeholder/ThumbListingPlaceholder/ThumbListingPlaceholder';
import Dotdotdot from 'react-dotdotdot'
import { parseVNDCurrency } from '../../../../@helper/helper';

ListingItem.propTypes = {

};

const listingItem = {
    float: 'left',
    width: '50%',
    padding: '0 8px 0 0',
    marginBottom: '12px',
    position: 'relative',
}

const geodirCategoryListing = {
    borderRadius: '10px',
    background: '#fff',
    border: '1px solid #eee',
}

const geodirCategoryImg = {
    float: 'left',
    width: '100%',
    position: 'relative',
    zIndex: '11',
    borderRadius: '10px 10px 0 0',
}

const geodir_js_favorite_btn = {
    position: 'absolute',
    left: '20px',
    top: '20px',
    zIndex: '20',
    cursor: 'pointer',
    color: '#fff',
    textAlign: 'center',
}

const geodir_js_favorite_btn_i = {
    float: 'left',
    width: '36px',
    height: '36px',
    lineHeight: '36px',
    borderRadius: '100%',
    background: "#425998",
    position: 'relative',
    zIndex: '2',
}

const geodir_js_favorite_btn_span = {
    borderRadius: '36px',
    background: '#425998',
    float: 'left',
    left: '-36px',
    height: '36px',
    lineHeight: '36px',
    color: '#fff',
    padding: '0 18px 0 48px',
    fontSize: '11px',
    fontWeight: '600',
    position: 'relative',
    top: '0',
    zIndex: '1',
    transition: 'all 0.2s ease-in-out',
    opacity: 0,
    marginTop: '-2px',
    visibility: 'hidden',
}

const geodir_category_img_wrap = {
    overflow: 'hidden',
    borderRadius: '10px 10px 0 0',
}

const geodir_category_img_wrap_img = {
    transform: 'translateZ(0)',
    transition: 'all 2000ms cubic-bezier(0.19, 1, 0.22, 1) 0ms',
    width: '100%',
    height: '250px',
}

const listing_avatar = {
    position: 'absolute',
    bottom: '-5px',
    right: '40px',
    zIndex: '14',
}

const listing_avatar_img = {
    width: '50px',
    height: '50px',
    boxShadow: '0px 0px 0px 6px rgb(255 255 255)',
    borderRadius: '100%',
    position: 'relative',
    zIndex: '2',
}

const avatar_tooltip = {
    position: 'absolute',
    top: 0,
    marginTop: '4px',
    opacity: 0,
    right: 0,
    paddingRight: '60px',
    minWidth: '200px',
    visibility: 'hidden',
    height: '56px',
    lineHeight: '56px',
    borderRadius: '56px',
    zIndex: 1,
    background: '#fff',
    color: '#878c9f',
    fontSize: '11px',
    fontWeight: '600',
    boxShadow: '0 9px 26px rgb(58 87 135 / 15%)',
    transition: 'all 0.2s ease-in-out',
}

const geodir_status_date = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: '20',
    padding: '6px 10px',
    color: '#fff',
    zIndex: '20',
    fontSize: '11px',
    borderRadius: '20px',
    boxShadow: '0px 0px 0px 5px rgb(255 255 255 / 20%)',
}

const geodir_category_opt = {
    position: 'absolute',
    bottom: '20px',
    left: '0',
    width: '100%',
    zIndex: '3',
    padding: '10px 20px',
    cursor: 'pointer',
}

const review_score = {
    background: '#384f95',
    color: '#fff',
    float: 'left',
    fontWeight: '600',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '13px',
    marginRight: '12px',
}

const listing_rating = {
    float: 'left',
    position: 'relative',
    top: 0,
}

const listing_rating_i = {
    fontSize: '10px',
    marginRight: '4px',
    position: 'relative',
    zIndex: '2',
}

const reviews_count = {
    float: 'left',
    color: '#fff',
    fontSize: '11px',
    position: 'relative',
    top: '2px',
}

const geodir_category_content_title = {
    padding: '2px 20px 20px',
    marginBottom: '10px',
    borderBottom: '1px solid #eee',
}

const geodir_category_content_title_item = {
    float: 'left',
    width: '100%',
    position: 'relative',
    zIndex: 1,
}

const geodir_category_content_h3 = {
    float: 'left',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '16px',
    marginBottom: '10px',
    fontFamily: "'Nunito', sans-serif",
}

const verified_badge = {
    display: 'inline-table',
    marginLeft: '12px',
    width: '18px',
    height: '18px',
    lineHeight: '18px',
    borderRadius: '100%',
    color: '#fff',
    fontSize: '10px',
    textAlign: 'center',
    fontWeight: '900',
    position: 'relative',
    top: '-2px',
}

const geodir_category_location_a = {
    float: 'left',
    color: '#7d93b2',
    textAlign: 'left',
    fontSize: '13px',
}

const geodir_category_content_p = {
    textAlign: 'left',
    fontSize: '13px',
    color: '#999',
    fontWeight: '500',
    // paddingBottom: '10px',
    // lineHeight: '24px',
    marginBottom: 0,
}

const facilities_list_title = {
    float: 'left',
    marginRight: '10px',
    color: '#566985',
    fontWeight: '700',
}

const facilities_list_li = {
    float: 'left',
    marginRight: '14px',
    cursor: 'pointer',
    position: 'relative',
}

const geodir_category_footer = {
    margin: '4px 0 0 0',
    padding: '0px 20px 15px 10px',
    borderTop: '1px solid #eee',
}

const listing_item_category = {
    width: 'auto',
    height: '36px',
    lineHeight: '36px',
    color: '#fff',
    float: 'left',
    borderRadius: '100%',
    position: 'relative',
}

const geodir_opt_list = {
    float: 'right',
    position: 'relative',
    top: '8px',
}

const geodir_opt_list_li = {
    float: 'left',
    marginLeft: '16px',
}

const geodir_opt_list_a = {
    float: 'left',
    position: 'relative',
    fontSize: '16px',
    color: '#9ea6ba',
    cursor: 'pointer',
}

const geodir_opt_tooltip = {
    position: 'absolute',
    opacity: 0,
    right: 0,
    top: '-40px',
    height: '30px',
    lineHeight: '30px',
    minWidth: '100px',
    marginLeft: '-65px',
    color: '#fff',
    fontSize: '11px',
    visibility: 'hidden',
    borderRadius: '2px',
    background: '#313e6e',
}

const gdop_list_link = {
    float: 'left',
    position: 'relative',
    fontSize: '16px',
    color: '#9ea6ba',
    cursor: 'pointer',
}

const geodir_category_price = {
    float: 'right',
    marginRight: '16px',
    position: 'relative',
    top: '13px',
}

const geodir_category_contacts = {
    position: 'absolute',
    right: '20px',
    bottom: '70px',
    padding: '20px 20px',
    background: '#fff',
    boxShadow: '0 9px 26px rgb(58 87 135 / 15%) !important',
    zIndex: '20',
    maxWidth: '250px',
    borderRadius: '4px',
    border: '1px solid #eee',
    transition: 'all 0.2s ease-in-out',
    opacity: '0',
    visibility: 'hidden',
}

const close_gcc = {
    position: 'absolute',
    right: '10px',
    top: '10px',
    zIndex: '3',
    fontSize: '14px',
    color: '#9ea6ba',
    cursor: 'pointer',
}

const geodir_category_contacts_li = {
    float: 'left',
    width: '100%',
    margin: '5px 0',
    textAlign: 'left',
}

const geodir_category_contacts_li_span = {
    marginRight: '10px',
    color: '#9ea6ba',
    float: 'left',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '600',
}

const geodir_category_contacts_li_a = {
    float: 'left',
    color: '#7d93b2',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '600',
}

const price_name_tooltip = {
    position: 'absolute',
    opacity: 0,
    right: 0,
    top: '-40px',
    height: '30px',
    lineHeight: '30px',
    minWidth: '100px',
    marginLeft: '-65px',
    color: '#fff',
    fontSize: '11px',
    visibility: 'hidden',
    borderRadius: '2px',
    background: '#313e6e',
    right: '-35px',
}

const listing_item_category_wrap_span = {
    float: 'left',
    marginLeft: '10px',
    position: 'relative',
    top: '10px',
    color: '#7d93b2',
    fontWeight: '600',
}

function ListingItem(props) {

    const { listing, loggedInUser, isLoggedIn } = props;

    const history = useHistory();

    const handleSave = async (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            const params = {
                listing_id: listing.listing_id,
                user_id: loggedInUser.id
            }
            await listingApi.favoriteListing(params);
        }
    }

    return (
        <div className="k-listing-item" style={listingItem}>
            <article className="k-geodir-category-listing fl-wrap" style={geodirCategoryListing}>
                <div className="k-geodir-category-img" style={geodirCategoryImg}>
                    {!isLoggedIn ?
                        <LoginModal>
                            <a className="k-geodir-js-favorite_btn" style={geodir_js_favorite_btn}><i className="fal fa-heart" style={geodir_js_favorite_btn_i} /><span style={geodir_js_favorite_btn_span}>Save</span></a>
                        </LoginModal>
                        :
                        <a onClick={(e) => handleSave(e)} className="k-geodir-js-favorite_btn" style={geodir_js_favorite_btn}><i className="fal fa-heart" style={geodir_js_favorite_btn_i} /><span style={geodir_js_favorite_btn_span}>Save</span></a>
                    }
                    <Link to={`/listing/${listing.listing_id}`} className="k-geodir-category-img-wrap fl-wrap" style={geodir_category_img_wrap}>
                        <ThumbListingPlaceholder
                            listing_img={listing.listing_img}
                            className='geodir_category_img_wrap_img'
                        />
                    </Link>

                    <div className="k-geodir-category-opt" style={geodir_category_opt}>
                        <div className="k-listing-rating-count-wrap">
                            <div className="k-review-score" style={review_score}>{listing.rating.toFixed(1)}</div>
                            <div data-starrating2={5} style={listing_rating} >
                                <i className='fas fa-star' style={{ color: '#facc39' }} />
                            </div>

                            <br />
                            <div className="k-reviews-count" style={reviews_count}>12 reviews</div>
                        </div>
                    </div>
                </div>
                <div className="k-geodir-category-content fl-wrap" style={{ zIndex: 2 }}>
                    <div className="k-geodir-category-content-title fl-wrap" style={geodir_category_content_title}>
                        <div className="geodir-category-content-title-item" style={geodir_category_content_title_item}>
                            <p className="k-small-text" style={geodir_category_content_p}>{listing.listing_type} - {listing.bedroom_count} phòng ngủ</p>


                            <h3 className="title-sin_map" style={geodir_category_content_h3}>
                                <Link to={`/listing/${listing.listing_id}`} style={{ color: '#566985' }} title={listing.name}>
                                    <Dotdotdot clamp={2}>
                                        <p>{listing.name}</p>
                                    </Dotdotdot>
                                </Link>
                            </h3>
                            <div className="k-geodir-category-location fl-wrap"><a href="#" className="map-item" style={geodir_category_location_a}><i className="fas fa-map-marker-alt" style={{ color: '#4DB7FE', paddingRight: '6px' }} />{listing.street_address}</a></div>
                        </div>
                    </div>
                    <div className="k-geodir-category-text fl-wrap" style={{ padding: '0 20px' }}>
                        <div className="k-facilities-list fl-wrap" style={{ margin: '10px 0' }}>
                            <div className="k-facilities-list-title" style={facilities_list_title}>Facilities : </div>
                            <ul style={{ listStyle: 'none' }}>
                                <li className="tolt" data-microtip-position="top" data-tooltip="Free WiFi" style={facilities_list_li}><i className="fal fa-wifi" style={{ color: '#4DB7FE' }} /></li>
                                <li className="tolt" data-microtip-position="top" data-tooltip="Parking" style={facilities_list_li}><i className="fal fa-parking" style={{ color: '#4DB7FE' }} /></li>
                                <li className="tolt" data-microtip-position="top" data-tooltip="Non-smoking Rooms" style={facilities_list_li}><i className="fal fa-smoking-ban" style={{ color: '#4DB7FE' }} /></li>
                                <li className="tolt" data-microtip-position="top" data-tooltip="Pets Friendly" style={facilities_list_li}><i className="fal fa-dog-leashed" style={{ color: '#4DB7FE' }} /></li>
                            </ul>
                        </div>
                    </div>
                    <div className="k-geodir-category-footer fl-wrap" style={geodir_category_footer}>
                        <a className="listing-item-category-wrap" style={{ float: 'left', position: 'relative' }}>
                            {/* <div className="k-listing-item-category" style={listing_item_category}></div> */}
                            <span style={listing_item_category_wrap_span}>{parseVNDCurrency(listing.price_per_night)} /đêm</span>
                        </a>
                        <div className="k-geodir-opt-list" style={geodir_opt_list}>
                            <ul style={{ listStyle: 'none' }}>
                                <li style={geodir_opt_list_li}><a href="#" className="show_gcc" style={geodir_opt_list_a}><i className="fal fa-envelope" /><span className="geodir-opt-tooltip" style={geodir_opt_tooltip}>Contact Info</span></a></li>
                                <li style={geodir_opt_list_li}><a href="#1" className="map-item" style={geodir_opt_list_a}><i className="fal fa-map-marker-alt" /><span className="geodir-opt-tooltip" style={geodir_opt_tooltip}>On the map <strong>1</strong></span> </a></li>
                                <li style={geodir_opt_list_li}>
                                    <div className="dynamic-gal gdop-list-link" style={gdop_list_link} data-dynamicpath="[{'src': 'images/all/1.jpg'},{'src': 'images/all/1.jpg'}, {'src': 'images/all/1.jpg'}]"><i className="fal fa-search-plus" /><span className="geodir-opt-tooltip" style={geodir_opt_tooltip}>Gallery</span></div>
                                </li>
                            </ul>
                        </div>
                        {/* <div className="price-level geodir-category_price" style={geodir_category_price}>
                            <span className="price-level-item" data-pricerating={3} />
                            <span className="price-name-tooltip" style={price_name_tooltip}>Pricey</span>
                        </div>
                        <div className="geodir-category_contacts" style={geodir_category_contacts}>
                            <div className="close_gcc" style={close_gcc}><i className="fal fa-times-circle" /></div>
                            <ul style={{ listStyle: 'none' }}>
                                <li style={geodir_category_contacts_li}><span style={geodir_category_contacts_li_span}><i className="fal fa-phone" style={{ marginRight: '6px' }} /> Call : </span><a href="#" style={geodir_category_contacts_li_a}>+38099231212</a></li>
                                <li style={geodir_category_contacts_li}><span style={geodir_category_contacts_li_span}><i className="fal fa-envelope" style={{ marginRight: '6px' }} /> Write : </span><a href="#" style={geodir_category_contacts_li_a}>yourmail@domain.com</a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </article >
        </div >
    );
}

export default ListingItem;
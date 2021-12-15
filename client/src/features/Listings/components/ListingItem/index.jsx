import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import listingApi from '../../../../api/listingApi';

ListingItem.propTypes = {

};

function ListingItem(props) {

    const { listing_type, name, price_per_night, listing_id, loggedInUser, setTriggerPopup } = props;

    const history = useHistory();

    const handleFavorite = async (e, listing_id) => {
        e.preventDefault();
        if (!!loggedInUser.id) {
            const params = {
                listing_id: listing_id,
                user_id: loggedInUser.id
            }
            const res = await listingApi.favoriteListing(params);
            console.log(res.data);
        } else {
            setTriggerPopup(true);
        }
    }

    return (
        // <div className="col-xl-3 col-lg-4 col-md-4 isotope-item latest">
        //     <div className="box_grid">
        //         <figure>
        //             <a href="#0" className="wish_bt" onClick={(e) => handleFavorite(e, listing_id)} />
        //             <NavLink to={`/listing/${listing_id}`}><img src="img/hotel_2.jpg" className="img-fluid" alt="" width={800} height={533} /></NavLink>
        //             {/* <small>Paris Centre</small> */}
        //         </figure>
        //         <div className="wrapper">
        //             <span className="k-homestay-type">{listing_type}</span>
        //             <h3><NavLink to={`/listing/${listing_id}`}>{name}</NavLink></h3>
        //             <div className='k-price-star'>
        //                 <div className="cat_star"><i className="icon_star" /><span className='k-rates'> 1 </span><span className='k-rates-count'>(1)</span></div>
        //                 <b className='k-price'>{price_per_night}₫/đêm</b>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="col-lg-12 col-md-12">
            <div className="listing-item-container list-layout" data-marker-id={1}>
                <a href="listings-single-page.html" className="listing-item">
                    {/* Image */}
                    <div className="listing-item-image">
                        <img src="images/listing-item-01.jpg" alt="" />
                        <span className="tag">Eat &amp; Drink</span>
                    </div>
                    {/* Content */}
                    <div className="listing-item-content">
                        <div className="listing-item-inner">
                            <h3>Tom's Restaurant <i className="verified-icon" /></h3>
                            <span>964 School Street, New York</span>
                            <div className="star-rating" data-rating="3.5">
                                <div className="rating-counter">(12 reviews)</div>
                                <span class="star"></span>
                            </div>
                        </div>
                        <span className="like-icon" />
                    </div>
                </a>
            </div>
        </div>
    );
}

export default ListingItem;
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

ListingItem.propTypes = {

};

function ListingItem(props) {
    const { listing_type, name, price_per_night } = props;
    return (
        <div className="col-xl-3 col-lg-4 col-md-4 isotope-item latest">
            <div className="box_grid">
                <figure>
                    <a href="#0" className="wish_bt" />
                    <a href="hotel-detail.html"><img src="img/hotel_2.jpg" className="img-fluid" alt="" width={800} height={533} /><div className="read_more"><span>Read more</span></div></a>
                    {/* <small>Paris Centre</small> */}
                </figure>
                <div className="wrapper">
                    <span className="k-homestay-type">{listing_type}</span>
                    <h3><a href="hotel-detail.html">{name}</a></h3>
                    <div className='k-price-star'>
                        <div className="cat_star"><i className="icon_star" /><span className='k-rates'> 1 </span><span className='k-rates-count'>(1)</span></div>
                        <b className='k-price'>{price_per_night}₫/đêm</b>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingItem;
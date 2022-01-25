import React from 'react';
import PropTypes from 'prop-types';

ListingSort.propTypes = {

};

const list_main_wrap_title = {
    float: 'left',
    position: 'relative',
}

const list_main_wrap_title_h2 = {
    textAlign: 'left',
    fontWeight: 500,
    fontSize: '16px',
    float: 'left',
    color: '#566985',
    position: 'relative',
    top: '10px',
}

const list_main_wrap_opt = {
    float: 'right',
    position: 'relative',
    right: '12px'
}

const price_opt_title = {
    float: 'left',
    paddingRight: '14px',
    position: 'relative',
    top: '14px',
    fontSize: '12px',
    color: '#999',
    fontWeight: 900,
}

const listsearch_input_item = {
    width: '180px',
    float: 'left',
    marginBottom: 0,
    position: 'relative',
}

function ListingSort(props) {
    const { totalListing, handleChange, sort, city } = props;
    const checkOption = () => {
        if (sort == 'desc') {
            return (
                <>
                    <option>-- Select --</option>
                    <option value='asc'>Price: low to high</option>
                    <option value='desc' selected>Price: high to low</option>
                </>
            )
        } else if (sort == 'asc') {
            return (
                <>
                    <option>-- Select --</option>
                    <option value='asc' selected>Price: low to high</option>
                    <option value='desc'>Price: high to low</option>
                </>
            )
        } else {
            return (
                <>
                    <option>-- Select --</option>
                    <option value='asc'>Price: low to high</option>
                    <option value='desc'>Price: high to low</option>
                </>
            )
        }
    }
    return (
        <div className="list-main-wrap-header">
            <div className="list-main-wrap-title" style={list_main_wrap_title}>
                <h2 style={list_main_wrap_title_h2}>{totalListing} homestays tại <span>{city}</span></h2>
            </div>
            <div className="list-main-wrap-opt" style={list_main_wrap_opt}>
                <div className="price-opt" style={{ float: 'left' }}>
                    <span className="price-opt-title" style={price_opt_title}>Sort by:</span>
                    <div className="listsearch-input-item" style={listsearch_input_item}>
                        <select data-placeholder="Popularity" className="chosen-select no-search-select" value={sort} onChange={handleChange}>
                            {checkOption()}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingSort;
import React from 'react';
import PropTypes from 'prop-types';

ListingSort.propTypes = {

};

const no_vis_shadow = {

}

const block_box = {

}

const list_main_wrap_header = {

}

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
    return (
        <div className="list-main-wrap-header" style={list_main_wrap_header}>
            <div className="list-main-wrap-title" style={list_main_wrap_title}>
                <h2 style={list_main_wrap_title_h2}>1836 homestay tại <span>New York </span></h2>
            </div>
            <div className="list-main-wrap-opt" style={list_main_wrap_opt}>
                <div className="price-opt" style={{ float: 'left' }}>
                    <span className="price-opt-title" style={price_opt_title}>Sort by:</span>
                    <div className="listsearch-input-item" style={listsearch_input_item}>
                        <select data-placeholder="Popularity" className="chosen-select no-search-select" style={{ display: 'none' }}>
                            <option>Price: low to high</option>
                            <option>Price: high to low</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingSort;
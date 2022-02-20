import React from 'react';
import PropTypes from 'prop-types';
import './ListingSort.scss';
import Select from 'react-select';


ListingSort.propTypes = {

};

const list_main_wrap_title = {
    float: 'left',
    position: 'relative',
    height: '53px',
}

const list_main_wrap_title_h2 = {
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '16px',
    float: 'left',
    color: '#566985',
    lineHeight: '53px',
}

const list_main_wrap_opt = {
    float: 'right',
    position: 'relative',
    right: '12px',
}

const price_opt_title = {
    float: 'left',
    paddingRight: '10px',
    fontSize: '14px',
    color: '#566985',
    fontWeight: 900,
    lineHeight: '51px',
}

const listsearch_input_item = {
    width: '180px',
    float: 'left',
    marginBottom: 0,
    position: 'relative',
}

const customStyles = {
    control: base => ({
        ...base,
        height: '51px',
        fontSize: '14px',
        borderRadius: '3px',
        border: '1px solid #dbdbdb',
    })
};

const options = [
    { value: 'asc', label: 'Price: low to high' },
    { value: 'desc', label: 'Price: high to low' },
]

function ListingSort(props) {
    const { totalListing, handleChange, sort, city } = props;
    // const checkOption = () => {
    //     if (sort == 'desc') {
    //         return (
    //             <>
    //                 <option>Select</option>
    //                 <option value='asc'>Price: low to high</option>
    //                 <option value='desc' selected>Price: high to low</option>
    //             </>
    //         )
    //     } else if (sort == 'asc') {
    //         return (
    //             <>
    //                 <option>Select</option>
    //                 <option value='asc' selected>Price: low to high</option>
    //                 <option value='desc'>Price: high to low</option>
    //             </>
    //         )
    //     } else {
    //         return (
    //             <>
    //                 <option>Select</option>
    //                 <option value='asc'>Price: low to high</option>
    //                 <option value='desc'>Price: high to low</option>
    //             </>
    //         )
    //     }
    // }
    return (
        <div className="wrap-title-header fl-wrap">
            <div className="list-main-wrap-title" style={list_main_wrap_title}>
                <h2 style={list_main_wrap_title_h2}>{totalListing} homestays in <span>{city}</span></h2>
            </div>
            <div className="list-main-wrap-opt" style={list_main_wrap_opt}>
                <div className="price-opt" style={{ float: 'left' }}>
                    <span className="price-opt-title" style={price_opt_title}>Sort by:</span>
                    <div className="listsearch-input-item" style={listsearch_input_item}>
                        {/* <select data-placeholder="Popularity" className="chosen-select no-search-select" value={sort} onChange={handleChange} style={{ boxShadow: 'none' }}>
                            {checkOption()}
                        </select> */}

                        <Select
                            options={options}
                            name="color"
                            styles={customStyles}
                            placeholder='Select'
                            isSearchable={false}
                            onChange={option => handleChange(option)}
                            defaultValue={(sort == 'desc') ? options[1] : (sort == 'asc') ? options[0] : null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingSort;
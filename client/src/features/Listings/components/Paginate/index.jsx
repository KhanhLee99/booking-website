import React from 'react';
import PropTypes from 'prop-types';

Paginate.propTypes = {

};

function Paginate(props) {

    const { totalPages, paginate } = props;
    const pageNumbers = [1, 2, 3];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        // <nav>
        //     <ul className='pagination'>
        //         {pageNumbers.map(number => (
        //             <li key={number} className='page-item'>
        //                 <span onClick={() => paginate(number)} className='page-link'>
        //                     {number}
        //                 </span>
        //             </li>
        //         ))}
        //     </ul>
        // </nav>
        <div className="row fs-listings">
            <div className="col-md-12">
                {/* Pagination */}
                <div className="clearfix" />
                <div className="row">
                    <div className="col-md-12">
                        {/* Pagination */}
                        <div className="pagination-container margin-top-15 margin-bottom-40">
                            <nav className="pagination">
                                <ul>
                                    {/* <li><a href="#" className="current-page">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#"><i className="sl sl-icon-arrow-right" /></a></li> */}
                                    {pageNumbers.map(number => (
                                        <li key={number}>
                                            <a href="#" onClick={() => paginate(number)} className="current-page">{number}</a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="clearfix" />
                {/* Pagination / End */}
            </div>
        </div>
    );
}

export default Paginate;


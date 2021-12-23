import React from 'react';
import PropTypes from 'prop-types';
import HeaderHost from '../../components/HeaderHost';
import './styles.scss';

Hosting.propTypes = {

};

function Hosting(props) {
    return (
        <div id="wrapper">
            <HeaderHost />
            <div className="clearfix" />
            <div className="k-content">
                <div className='k-listing-info'>
                    <div className='k-listing-count'>
                        <h3>2 nha/phong cho thue</h3>
                    </div>
                    <div className='k-add-listing'>
                        <a href="dashboard-add-listing.html" className="button border with-icon">Add Listing <i className="sl sl-icon-plus"></i></a>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className='k-title-name-th'>Nha/Phong cho thue</th>
                            <th scope="col">Trang thai</th>
                            <th scope="col">Viec can lam</th>
                            <th scope="col">Dat ngay</th>
                            <th scope="col">Phong ngu</th>
                            <th scope="col">Giuong</th>
                            <th scope="col">Phong tam</th>
                            <th scope="col">Vi tri</th>
                            <th scope="col">Sua doi lan cuoi</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>
                                <div>
                                    <img className='k-image-thumbnail-td' src='/images/blog-compact-post-01.jpg' />
                                    <span className='k-listing-name-td'>My Room</span>
                                </div>

                            </td>
                            <td>Dang tien hanh</td>
                            <td>Hoan tat</td>
                            <td>Bat</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>D1h</td>
                            <td>D1h</td>

                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>
                                <div>
                                    <img className='k-image-thumbnail-td' src='/images/blog-compact-post-01.jpg' />
                                    <span className='k-listing-name-td'>My Room</span>
                                </div>
                            </td>
                            <td>Dang tien hanh</td>
                            <td>Hoan tat</td>
                            <td>Bat</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>D1h</td>
                            <td>D1h</td>

                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>
                                <div>
                                    <img className='k-image-thumbnail-td' src='/images/blog-compact-post-01.jpg' />
                                    <span className='k-listing-name-td'>My Room</span>
                                </div>
                            </td>
                            <td>Dang tien hanh</td>
                            <td>Hoan tat</td>
                            <td>Bat</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>D1h</td>
                            <td>D1h</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Hosting;
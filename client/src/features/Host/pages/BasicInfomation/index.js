import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

BasicInfomation.propTypes = {

};

function BasicInfomation(props) {
    return (
        <div className='k-wrap'>
            <div className='k-header'></div>
            <div className='k-content'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-7 k-left-side'>
                            <div id="add-listing">
                                {/* Section */}
                                <div className="add-listing-section">
                                    {/* Headline */}
                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-doc" /> Basic Informations</h3>
                                    </div>
                                    {/* Title */}
                                    <div className='k-property-type'>
                                        <h5>CHỖ NGHỈ CỦA BẠN LÀ:</h5>
                                        <div className='k-list-property-type'>
                                            <div className='k-property-type-item'>
                                                <p>Khong gian doc dao</p>
                                                <img className='' src='/images/blog-compact-post-01.jpg' />
                                            </div>
                                        </div>

                                        <div className='k-list-property-type'>
                                            <div className='k-property-type-item'>
                                                <p>dhasgjfg</p>
                                                <img className='' src='/images/blog-compact-post-01.jpg' />
                                            </div>
                                        </div>

                                        <div className='k-list-property-type'>
                                            <div className='k-property-type-item'>
                                                <p>dhasgjfg</p>
                                                <img className='' src='/images/blog-compact-post-01.jpg' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row with-forms">
                                        {/* Status */}
                                        <div className="col-md-12">
                                            <h5>HÌNH THỨC CHO THUÊ ?</h5>

                                            <div className='k-property-type'>
                                                <div className='k-list-property-type'>
                                                    <div className='k-property-type-item'>
                                                        <p>Toàn bộ nhà</p>
                                                    </div>
                                                </div>

                                                <div className='k-list-property-type'>
                                                    <div className='k-property-type-item'>
                                                        <p>Phòng riêng</p>
                                                    </div>
                                                </div>

                                                <div className='k-list-property-type'>
                                                    <div className='k-property-type-item'>
                                                        <p>Phòng chung</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row with-forms">
                                        <div className="col-md-12">
                                            <h5>LOẠI ĐẶT CHỖ ?</h5>
                                            <select className="k-dropdown">
                                                <option>Đặt phòng nhanh</option>
                                                <option>Yêu cầu xác nhận</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* Row / End */}
                                </div>
                            </div>

                        </div>
                        <div className='col-5 k-right-side'>
                            <div className='k-property-description'>
                                <div className='k-property-content'>
                                    <h5>Chung cu</h5>
                                    <p>Can ho khep kin, cung tap trung tren mot mat san trong mot toa nha lon</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BasicInfomation;
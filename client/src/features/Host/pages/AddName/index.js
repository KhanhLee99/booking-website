import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

AddName.propTypes = {

};

const disable_resize = {
    resize: 'none'
}

function AddName(props) {
    return (
        <div className='k-wrap'>
            <div className='k-header'></div>
            <div className='k-content'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-8 k-left-side'>
                            <div id="add-listing">
                                {/* Section */}
                                <div className="add-listing-section">
                                    {/* Headline */}
                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-doc" />Tiêu đề và mô tả</h3>
                                    </div>
                                    {/* Title */}

                                    <div className="row with-forms">
                                        <div className="col-md-12">
                                            <h5>Tên chỗ nghỉ của bạn là:</h5>
                                            <p>Hãy thu hút khách hàng bằng cách đặt tiêu đề chỗ nghỉ của bạn trở nên đặc biệt.</p>
                                            <input type="text" placeholder="Listing title" />
                                        </div>

                                        <div className="col-md-12">
                                            <h5>Mô tả</h5>
                                            <p>Chia sẻ với khách hàng một vài thông tin ngắn gọn và nổi bật về chỗ nghỉ này của bạn.</p>
                                            <textarea placeholder='Description' style={disable_resize}></textarea>
                                        </div>
                                    </div>



                                    {/* Row / End */}
                                </div>
                            </div>
                        </div>
                        <div className='col-4 k-right-side'>
                            <div className='k-property-description'>
                                <div className='k-property-content'>
                                    <h5>Chung cu</h5>
                                    <p>Can ho khep kin, cung tap trung tren mot mat san trong mot toa nha lon</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-8 k-left-side'>
                            <div id="add-listing">
                                {/* Section */}
                                <div className="add-listing-section">
                                    {/* Headline */}
                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-doc" />Tiêu đề và mô tả</h3>
                                    </div>
                                    {/* Title */}

                                    <div className="row with-forms">
                                        <div className="col-md-12">
                                            <h5>Tên chỗ nghỉ của bạn là:</h5>
                                            <p>Hãy thu hút khách hàng bằng cách đặt tiêu đề chỗ nghỉ của bạn trở nên đặc biệt.</p>
                                            <input type="text" placeholder="Listing title" />
                                        </div>

                                        <div className="col-md-12">
                                            <h5>Mô tả</h5>
                                            <p>Chia sẻ với khách hàng một vài thông tin ngắn gọn và nổi bật về chỗ nghỉ này của bạn.</p>
                                            <textarea placeholder='Description' style={disable_resize}></textarea>
                                        </div>
                                    </div>



                                    {/* Row / End */}
                                </div>
                            </div>
                        </div>
                        <div className='col-4 k-right-side'>
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
            <div className='k-footer'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 k-back-div'>
                            <a href='#' className='k-back'>Quay lai</a>
                        </div>
                        <div className='col-6 k-next-div'>
                            <a href='#' className='k-next'>Tiep theo</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddName;
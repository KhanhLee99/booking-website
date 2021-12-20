import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

AddPrice.propTypes = {

};

function AddPrice(props) {
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
                                        <h3><i className="sl sl-icon-doc" />Chính sách giá</h3>
                                    </div>
                                    {/* Title */}

                                    <div className="row with-forms">
                                        <div className="col-md-12">
                                            <h5>Tiền tệ</h5>
                                            <select className="k-dropdown" disabled>
                                                <option>VND</option>
                                                <option>USA</option>
                                            </select>
                                        </div>

                                        <h5 class="margin-top-30 margin-bottom-10">Phí sử dụng nền tảng</h5>
                                        <p>Với mỗi lượt đặt chỗ thành công, hệ thống sẽ thu phí dịch vụ 3% trên doanh thu từ chỗ nghỉ.</p>
                                    </div>



                                    {/* Row / End */}
                                </div>
                            </div>

                            <div id="add-listing">
                                {/* Section */}
                                <div className="add-listing-section">
                                    {/* Headline */}
                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-doc" />Thiết lập giá</h3>
                                    </div>
                                    {/* Title */}

                                    <div className="row with-forms">
                                        <div className="col-md-12">
                                            <h5>Giá cơ bản</h5>
                                        </div>

                                        <div className="col-md-12">
                                            <h5>THỨ 2 - THỨ 5</h5>
                                        </div>

                                        <div className="col-md-6">
                                            <input type="text" placeholder="e.g. 964 School Street" />
                                        </div>

                                        <div className="col-md-6">
                                            <h5>Bạn sẽ nhận 155,307 ₫/đêm</h5>
                                        </div>

                                        <div className="col-md-12">
                                            <h5>THỨ 6 - CHỦ NHẬT</h5>
                                        </div>

                                        <div className="col-md-6">
                                            <input type="text" placeholder="e.g. 964 School Street" />
                                        </div>

                                        <div className="col-md-6">
                                            <h5>Bạn sẽ nhận 155,307 ₫/đêm</h5>
                                        </div>

                                        <div className="col-md-12">
                                            <h5>Giá dài hạn</h5>
                                        </div>

                                        <div className="col-md-6">
                                        <h5>GIẢM GIÁ THEO TUẦN</h5>
                                            <input type="text" placeholder="e.g. 964 School Street" />
                                        </div>

                                        <div className="col-md-6">
                                        <h5>GIẢM GIÁ THEO THÁNG</h5>
                                            <input type="text" placeholder="e.g. 964 School Street" />
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
        </div>
    );
}

export default AddPrice;
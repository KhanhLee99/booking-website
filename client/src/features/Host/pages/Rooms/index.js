import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

Rooms.propTypes = {

};

function Rooms(props) {

    const [isHidden, setIsHidden] = useState(false);

    const handleAddBeds = (e) => {
        e.preventDefault();
        setIsHidden(!isHidden);
    }

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


                                    <div className="row with-forms">
                                        <div className="col-md-12">

                                            {/* <select className="k-dropdown">
                                                <option>Đặt phòng nhanh</option>
                                                <option>Yêu cầu xác nhận</option>
                                            </select> */}
                                            <div className='col-md-8'>
                                                <div className="panel-dropdown-content">
                                                    {/* Quantity Buttons */}
                                                    <h5>Bạn muốn chào đón bao nhiêu khách ?</h5>
                                                    <div className="qtyButtons">
                                                        <div className="qtyTitle">Khách</div>
                                                        <div className="qtyDec"></div>
                                                        <input type="text" name="qtyInput" defaultValue={1} />
                                                        <div className="qtyInc"></div>
                                                    </div>
                                                    <h5>How many bedrooms can guest use ?</h5>

                                                    <div className="qtyButtons">
                                                        <div className="qtyTitle">Phòng ngủ</div>
                                                        <div className="qtyDec"></div>
                                                        <input type="text" name="qtyInput" defaultValue={0} />
                                                        <div className="qtyInc"></div>
                                                    </div>

                                                    <h5>How many beds can guest use ?</h5>
                                                    <div className="qtyButtons">
                                                        <div className="qtyTitle">Giường</div>
                                                        <div className="qtyDec"></div>
                                                        <input type="text" name="qtyInput" defaultValue={0} />
                                                        <div className="qtyInc"></div>
                                                    </div>

                                                    <div className='add-bed-type'>
                                                        <div className='bed-info'>
                                                            <p className='bed-name'>Bed room 1</p>
                                                            <p className='bed-count'>0 beds</p>
                                                        </div>
                                                        <div className='add-bed-button'>
                                                            <a href='#' onClick={(e) => handleAddBeds(e)}>{isHidden ? 'Add beds' : 'Done'}</a>
                                                        </div>
                                                    </div>
                                                    {
                                                        isHidden ? (<div className='bed-types hidden-bed-types' >
                                                            <div className="qtyButtons">
                                                                <div className="qtyTitle">Double</div>
                                                                <div className="qtyDec"></div>
                                                                <input type="text" name="qtyInput" defaultValue={0} />
                                                                <div className="qtyInc"></div>
                                                            </div>

                                                            <div className="qtyButtons">
                                                                <div className="qtyTitle">Queen</div>
                                                                <div className="qtyDec"></div>
                                                                <input type="text" name="qtyInput" defaultValue={0} />
                                                                <div className="qtyInc"></div>
                                                            </div>

                                                            <div className="qtyButtons">
                                                                <div className="qtyTitle">Single</div>
                                                                <div className="qtyDec"></div>
                                                                <input type="text" name="qtyInput" defaultValue={0} />
                                                                <div className="qtyInc"></div>
                                                            </div>

                                                            <div className="qtyButtons">
                                                                <div className="qtyTitle">Sofa bed</div>
                                                                <div className="qtyDec"></div>
                                                                <input type="text" name="qtyInput" defaultValue={0} />
                                                                <div className="qtyInc"></div>
                                                            </div>
                                                        </div>) : null}


                                                    <div className="qtyButtons">
                                                        <div className="qtyTitle">Phòng tắm</div>
                                                        <div className="qtyDec"></div>
                                                        <input type="text" name="qtyInput" defaultValue={0} />
                                                        <div className="qtyInc"></div>
                                                    </div>
                                                </div>
                                            </div>
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
        </div >
    );
}

export default Rooms;
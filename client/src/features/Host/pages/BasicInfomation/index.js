import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import hostApi from '../../../../api/hostApi';
import { Fade } from 'reactstrap';
import PulseLoading from '../../../../components/Loading/PulseLoading';
import ListingTypeItem from '../../components/ListingTypeItem';
import RentalFormItem from '../../components/RentalFormItem';
import { useHistory } from 'react-router-dom';

BasicInfomation.propTypes = {

};

function BasicInfomation(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [listingTypes, setListTypes] = useState([]);
    const [idActive, setIdActive] = useState(null);
    const [rentalFormSelect, setRentalFormSelect] = useState(null);
    const rentalForms = [
        {
            id: 'entire_place',
            name: 'Toàn bộ nhà'
        },
        {
            id: 'private_room',
            name: 'Phòng riêng'
        },
        {
            id: 'shared_room',
            name: 'Phòng chung'
        }
    ];

    const addListing = async () => {
        try {
            const param = {
                listing_type_id: idActive,
                rental_form: rentalFormSelect
            }
            setLoading(true);
            await hostApi.addListing(param);
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    }

    const getNewestListing = async () => {
        try {
            const res = await hostApi.getNewestListing();
            if (res.data.data) {
                history.push(`/host/${res.data.data.id}/location`);
                setLoading(false);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const getListingTypes = async () => {
        try {
            const res = await hostApi.getListingType();
            setListTypes(res.data.data);
            console.log(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleNext = (e) => {
        e.preventDefault();
        console.log(idActive, rentalFormSelect);
        addListing().then(() => {
            getNewestListing();
        })
    }

    useEffect(() => {
        getListingTypes();
    }, []);

    const selectListingType = listingId => setIdActive(listingId);
    const selectRentalForm = rentalFormId => setRentalFormSelect(rentalFormId);

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
                                        {listingTypes.length > 0 ? listingTypes.map((type, index) => {
                                            return (
                                                <ListingTypeItem
                                                    key={index}
                                                    id={type.id}
                                                    name={type.name}
                                                    selectListingType={selectListingType}
                                                    idActive={idActive}
                                                />
                                            )
                                        }) : <PulseLoading colorLoading='#000000' />}

                                    </div>

                                    <div className="row with-forms">
                                        {/* Status */}
                                        <div className="col-md-12">
                                            <h5>HÌNH THỨC CHO THUÊ ?</h5>

                                            <div className='k-property-type'>
                                                {rentalForms.map((item, index) => {
                                                    return (
                                                        <RentalFormItem
                                                            key={index}
                                                            name={item.name}
                                                            id={item.id}
                                                            selectRentalForm={selectRentalForm}
                                                            rentalFormSelect={rentalFormSelect}
                                                        />
                                                    )
                                                })}
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
            <div className='k-footer'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 k-back-div'>
                            <a href='#' className='k-back'>Quay lại</a>
                        </div>
                        <div className='col-6 k-next-div'>
                            <button className={loading ? 'k-next disable' : 'k-next'} onClick={(e) => handleNext(e)} disabled={loading ? true : false}>{loading ? <PulseLoading /> : "Tiếp theo"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicInfomation;
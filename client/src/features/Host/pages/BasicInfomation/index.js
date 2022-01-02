import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import hostApi from '../../../../api/hostApi';
import { Fade } from 'reactstrap';
import PulseLoading from '../../../../components/Loading/PulseLoading';
import ListingTypeItem from '../../components/ListingTypeItem';
import RentalFormItem from '../../components/RentalFormItem';
import { useHistory, useParams } from 'react-router-dom';
import FooterHost from '../../components/FooterHost';
import listingApi from '../../../../api/listingApi';

BasicInfomation.propTypes = {

};

function BasicInfomation(props) {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [listingTypes, setListTypes] = useState([]);
    const [idActive, setIdActive] = useState(null);
    const [rentalFormSelect, setRentalFormSelect] = useState(null);
    const [reservationForm, setReservationForm] = useState('quick');
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
            if (idActive, rentalFormSelect) {
                const param = {
                    listing_type_id: idActive,
                    rental_form: rentalFormSelect,
                    reservation_form: reservationForm
                }
                setLoading(true);
                await hostApi.addListing(param).then(res => {
                    if (res.data.status == 'fail') {
                        setLoading(false);
                        return;
                    }
                });
            } else {
                console.log('sai')
            }
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

    const handleNext = async () => {
        if (id) {
            try {
                const params = {
                    listing_type_id: idActive,
                    rental_form: rentalFormSelect,
                    reservation_form: reservationForm
                }
                setLoading(true);
                await hostApi.updateListing(params, id).then(res => {
                    setLoading(false);
                    if (res.data.status == 'success') {
                        history.push(`/host/${id}/location`);
                    }
                });
            } catch (err) {
                console.log(err.message);
                setLoading(false)
            }
        } else {
            addListing().then(() => {
                getNewestListing();
            })
        }
    }

    const handleBack = (e) => {
        e.preventDefault();
        console.log(reservationForm);
    }

    const handleChange = e => {
        setReservationForm(e.target.value);
    }

    useEffect(() => {
        getListingTypes();
        return () => {
            setListTypes([]); // This worked for me
        };
    }, []);

    useEffect(() => {
        const fetchListingDetail = async () => {
            // setLoadingListingDetail(true)
            await listingApi.getListingById(id).then(res => {
                setIdActive(res.data.listing.listing_type_id);
                setRentalFormSelect(res.data.listing.rental_form);
                setReservationForm(res.data.listing.reservation_form);
            });
        }

        fetchListingDetail();
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
                                            <select className="k-dropdown" value={reservationForm} onChange={handleChange} >
                                                {
                                                    reservationForm === 'quick' ? (
                                                        <>
                                                            <option value="quick" selected>Đặt phòng nhanh</option>
                                                            <option value="request">Yêu cầu xác nhận</option>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <option value="quick" >Đặt phòng nhanh</option>
                                                            <option value="request" selected>Yêu cầu xác nhận</option>
                                                        </>
                                                    )
                                                }
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
            <FooterHost
                loading={loading}
                handleBack={handleBack}
                handleNext={handleNext}
                hiddenBackButton={true}
                isHandleClick={true}
            />
        </div>
    );
}

export default BasicInfomation;
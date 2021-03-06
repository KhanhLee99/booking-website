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
import Loading from '../../../../components/Loading/Loading';
import CommonAddListing from '../../../../components/CommonAddListing/CommonAddListing';
import TabAddListing from '../../components/TabAddListing/TabAddListing';

BasicInfomation.propTypes = {

};

const h3_title = {
    // textAlign: 'left',
    // fontWeight: 600,
    // fontSize: '21px',
    // color: '#566985',
    // marginBottom: '30px',
}

const custom_form_label = {
    // float: 'left',
    // position: 'relative',
    // width: '100%',
    // textAlign: 'left',
    // fontWeight: 500,
    // color: '#666',
    // color: '#878c9f',
    // fontSize: '13px',
    // fontWeight: 500,
    // marginBottom: '10px'
}

function BasicInfomation(props) {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [listingTypes, setListTypes] = useState([]);
    const [idActive, setIdActive] = useState(null);
    const [typeActive, setTypeActive] = useState(null);
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
                history.push(`/become-host/${res.data.data.id}/location`);
                setLoading(false);
            }
        } catch (err) {
            console.log(err.message);
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
                        history.push(`/become-host/${id}/location`);
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
        const getListingTypes = async () => {
            try {
                setLoading(true);
                await hostApi.getListingType().then(res => {
                    setListTypes(res.data.data);
                    if (id == undefined) {
                        const type = res.data.data[0];
                        setIdActive(type.id);
                        setTypeActive(type);
                    }
                    setLoading(false);
                });
            } catch (err) {
                console.log(err);
            }
        }

        getListingTypes();

        return () => {
            setListTypes([]);
        };
    }, []);

    useEffect(() => {
        const fetchListingDetail = async () => {
            // setLoadingListingDetail(true)
            await listingApi.getListingById(id).then(res => {
                setIdActive(res.data.data.listing.listing_type_id);
                setRentalFormSelect(res.data.data.listing.rental_form);
                setReservationForm(res.data.data.listing.reservation_form);
                setTypeActive(listingTypes.find(type => type.id == res.data.data.listing.listing_type_id));
            });
        }

        if (id && listingTypes.length > 0) {
            fetchListingDetail();
        }

    }, [listingTypes]);

    const selectListingType = listingId => {
        setIdActive(listingId);
        setTypeActive(listingTypes.find(item => item.id == listingId));
    }

    const selectRentalForm = rentalFormId => setRentalFormSelect(rentalFormId);

    return (
        <CommonAddListing>
            <TabAddListing
                id={id}
                basicInfo={true}
            />
            <div className='row'>
                {/* {loading && <Loading />} */}
                <div className='col-8'>
                    <div id="add-listing">
                        <h3 className='h3_title' style={h3_title}>Basic Informations</h3>

                        <div className="add-listing-section">
                            <div className='k-property-type'>
                                <label className='custom_form_label' style={custom_form_label}>CHỖ NGHỈ CỦA BẠN LÀ:</label>
                                {listingTypes.length > 0 ? listingTypes.map((type, index) => {
                                    return (
                                        <ListingTypeItem
                                            key={index}
                                            id={type.id}
                                            name={type.name}
                                            photo={type.url_photo}
                                            selectListingType={selectListingType}
                                            idActive={idActive}
                                        />
                                    )
                                }) : <PulseLoading colorLoading='#000000' />}

                            </div>

                            <div className="row with-forms">
                                <div className="col-md-12">
                                    <label className='custom_form_label' style={custom_form_label}>HÌNH THỨC CHO THUÊ ?</label>

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
                                    <label className='custom_form_label' style={custom_form_label}>LOẠI ĐẶT CHỖ ?</label>
                                    <select className="k-dropdown nice-select chosen-select no-search-select" value={reservationForm} onChange={handleChange} >
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

                        <FooterHost
                            loading={loading}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            hiddenBackButton={true}
                            isHandleClick={true}
                        />
                    </div>
                </div>
                <RightSide
                    type={typeActive}
                />
            </div>
        </CommonAddListing>
    );
}

export default BasicInfomation;

function RightSide(props) {
    const { type } = props;
    return (
        <div className='col-4 k-right-side'>
            <div className='k-property-content'>
                <h5>{type ? type.name : ''}</h5>
                <p>{type ? type.description : ''}</p>
            </div>
            <div className='k-property-content' style={{ top: '910px' }}>
                <h5>Sự khác biệt giữa Đặt phòng nhanh và Gửi yêu cầu đặt phòng là gì?</h5>
                <p>Đặt phòng nhanh dùng cho những chỗ nghỉ không cần có sự xác nhận của chủ nhà. Khách hàng chỉ cần thanh toán là có thể đặt chỗ.
                    <br /> Gửi yêu cầu đặt phòng dùng cho những chỗ nghỉ mà trước khi thực hiện thành toán, khách hàng cần nhận được sự đồng ý của chủ nhà.</p>
            </div>
        </div>
    )
}
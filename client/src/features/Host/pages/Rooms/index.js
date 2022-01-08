import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import IncDecFormQty from '../../components/IncDecFormQty';
import FooterHost from '../../components/FooterHost';
import AddBeds from '../../components/AddBeds';
import bedApi from '../../../../api/bedApi';
import hostApi from '../../../../api/hostApi';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

Rooms.propTypes = {

};

function Rooms(props) {
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [qtyGuests, setQtyGuests] = useState(1);
    const [qtyBedrooms, setQtyBedrooms] = useState(0);
    const [qtyBeds, setQtyBeds] = useState(0);
    const [qtyBathrooms, setQtyBathrooms] = useState(0);
    const [isHidden, setIsHidden] = useState(false);
    const [bedroomArr, setBedroomArr] = useState([]);
    // const [bedTypes, setBedTypes] = useState([]);
    const bedTypes = useSelector(state => state.hostSlice.bedTypes);
    const detailRooms = useSelector(state => state.hostSlice.detailRooms);

    const handleDec = (type) => {
        //     if (value > 0) {
        //         if (type == 'adults') {
        //             if (value == 1) return;
        //             setAdults(value - 1);
        //         } else {
        //             setChildrens(value - 1);
        //         }
        //     }
        if (type === 'guests') setQtyGuests(qtyGuests - 1);
        else if (type === 'bedrooms') {
            setQtyBedrooms(qtyBedrooms - 1);
            var tmp = bedroomArr;
            tmp.pop();
            setBedroomArr(tmp);
        }
        else if (type === 'beds') setQtyBeds(qtyBeds - 1);
        else if (type === 'bathrooms') setQtyBathrooms(qtyBathrooms - 1);
    }

    const handleInc = (type) => {
        // const total = adults + childrens;
        // if (total < listingDetail.max_guest_count) {
        //     type == 'adults' ? setAdults(value + 1) : setChildrens(value + 1);
        // }
        if (type === 'guests') setQtyGuests(qtyGuests + 1);
        else if (type === 'bedrooms') {
            setQtyBedrooms(qtyBedrooms + 1);
            var tmp = bedroomArr;
            tmp.push(qtyBedrooms);
            setBedroomArr(tmp);
        }
        else if (type === 'beds') setQtyBeds(qtyBeds + 1);
        else if (type === 'bathrooms') setQtyBathrooms(qtyBathrooms + 1);
    }

    // get list bed type
    // const getBedTypes = async () => {
    //     try {
    //         await bedApi.getListBedType().then(res => {
    //             console.log('res', res);
    //             setBedTypes(res.data.data);
    //         });
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // }

    const handleNext = async () => {
        try {
            const params = {
                bedroom_count: qtyBedrooms,
                bed_count: qtyBeds,
                rooms: detailRooms
            }
            setLoading(true);
            await hostApi.editBedRoom(params, id)
            await hostApi.updateListing({
                standard_guest_count: qtyGuests,
                bathroom_count: qtyBathrooms
            }, id).then(res => {
                if (res.data.status == 'success') {
                    history.push(`/host/${id}/amenities`);
                }
                setLoading(false);
            })
        } catch (err) {
            console.log(err);
            setLoading(false);
        }

    }

    const handleBack = () => {

    }

    useEffect(() => {
        // console.log(bedTypes);
        // getBedTypes();
        return () => {
            // setBedTypes([]);
        }
    }, [])

    return (
        <>

            <div id="add-listing">
                {/* Section */}
                <h3 className='h3_title'>Chính sách giá</h3>
                <div className="add-listing-section">

                    <div className="row with-forms">
                        <div className="col-md-12">
                            <div className='col-md-10'>
                                <div className="panel-dropdown-content">
                                    {/* Quantity Buttons */}
                                    <h5 style={{ fontSize: '15px', color: '#666' }}>Bạn muốn chào đón bao nhiêu khách ?</h5>
                                    <IncDecFormQty
                                        title='Khách'
                                        type='guests'
                                        qty={qtyGuests}
                                        handleInc={handleInc}
                                        handleDec={handleDec}
                                    />
                                    <h5 style={{ fontSize: '15px', color: '#666' }}>How many bedrooms can guest use ?</h5>

                                    <IncDecFormQty
                                        title='Phòng ngủ'
                                        type='bedrooms'
                                        qty={qtyBedrooms}
                                        handleInc={handleInc}
                                        handleDec={handleDec}
                                    />

                                    <h5 style={{ fontSize: '15px', color: '#666' }}>How many beds can guest use ?</h5>
                                    <IncDecFormQty
                                        title='Giường'
                                        type='beds'
                                        qty={qtyBeds}
                                        handleInc={handleInc}
                                        handleDec={handleDec}
                                    />

                                    {bedroomArr.map((item, index) => {
                                        return (
                                            <AddBeds
                                                key={index}
                                                number={index + 1}
                                                bedTypes={bedTypes}
                                                detailRooms={detailRooms}
                                            />
                                        )
                                    })}

                                    <IncDecFormQty
                                        title='Phòng tắm'
                                        type='bathrooms'
                                        qty={qtyBathrooms}
                                        handleInc={handleInc}
                                        handleDec={handleDec}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Row / End */}
                </div>
            </div>

            <FooterHost
                loading={loading}
                handleBack={handleBack}
                handleNext={handleNext}
                hiddenBackButton={false}
                isHandleClick={true}
            />
        </ >
    );
}

export default Rooms;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import amenityApi from '../../../../api/amenityApi';
import PulseLoading from '../../../../components/Loading/PulseLoading';
import AmenityTypeItem from '../../components/AmenityTypeItem';
import AmenityItem from '../../components/AmenityItem';
import ListAmenity from '../../components/ListAmenity';
import FooterHost from '../../components/FooterHost';
import hostApi from '../../../../api/hostApi';
import { useHistory, useParams } from 'react-router-dom';
import listingApi from '../../../../api/listingApi';

Amenity.propTypes = {

};

function Amenity(props) {
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [amenityTypes, setAmenityTypes] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [listAmenityChecked, setListAmenityChecked] = useState([]);
    const [validateErr, setValidateErr] = useState('');


    const getAmenity = async () => {
        try {
            await amenityApi.getAmenityType().then(res => {
                setAmenityTypes(res.data.data);
            })
            await amenityApi.getAmenity().then(res => {
                setAmenities(res.data.data)
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setListAmenityChecked([...listAmenityChecked, parseInt(e.target.id)]);
        } else {
            setListAmenityChecked(listAmenityChecked.filter((id) => id !== parseInt(e.target.id)));
        }
    }

    const handleNext = async () => {
        if (listAmenityChecked.length < 5) {
            setLoading(true);
            setTimeout(() => {
                setValidateErr('Vui lòng chọn ít nhất 5 tiện ích');
                setLoading(false);
                window.scrollTo(0, 0)
            }, 2000);
        } else {
            try {
                const params = {
                    amenities: listAmenityChecked
                }
                setLoading(true);
                await hostApi.addListingAmenities(params, id).then(res => {
                    setLoading(false);
                    if (res.data.status == 'success') {
                        history.push(`/host/${id}/photos`)
                    }
                });
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }
    }

    const handleBack = () => {

    }

    useEffect(() => {
        getAmenity();

        return () => {
            setAmenities([]);
            setAmenityTypes([]);
        }
    }, []);

    useEffect(() => {
        const fetchListingAmenitiesChecked = async () => {
            // setLoadingListingDetail(true)
            await hostApi.getListingAmenitiesId(id).then(res => {
                setListAmenityChecked(res.data.data);
            });
        }

        fetchListingAmenitiesChecked();

        return () => {
            setListAmenityChecked([]);
        }
    }, [amenities]);

    return (
        <>

            <div id="add-listing">
                <h3 className='h3_title'>Amenities</h3>

                <div className="add-listing-section">
                    {
                        validateErr.length > 0 ? (
                            <p style={{ color: "red" }}>{validateErr}</p>
                        ) : null
                    }
                    {amenityTypes.length ? amenityTypes.map((type, index) => {
                        return (
                            <div key={index}>
                                <AmenityTypeItem
                                    name={type.name}
                                />

                                <ListAmenity
                                    amenities={amenities}
                                    type={type}
                                    handleCheckboxChange={handleCheckboxChange}
                                    listAmenityChecked={listAmenityChecked}
                                />
                            </div>
                        )
                    }) : <PulseLoading colorLoading='#000000' />}
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
        </>
    );
}

export default Amenity;
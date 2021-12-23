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

Amenity.propTypes = {

};

function Amenity(props) {
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [amenityTypes, setAmenityTypes] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [listAmenity, setListAmenity] = useState([]);


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
            setListAmenity([...listAmenity, parseInt(e.target.id)]);
        } else {
            setListAmenity(listAmenity.filter((id) => id !== parseInt(e.target.id)));
        }
    }

    const handleNext = async () => {
        try {
            const params = {
                amenities: listAmenity
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

    const handleBack = () => {

    }

    useEffect(() => {
        getAmenity();

        return () => {
            setAmenities([]);
            setAmenityTypes([]);
        }
    }, [])
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
                                        <h3><i className="sl sl-icon-doc" />Amenities</h3>
                                    </div>
                                    {/* Title */}
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
                                                />
                                            </div>
                                        )
                                    }) : <PulseLoading colorLoading='#000000' />}
                                    {/* Row / End */}
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
                hiddenBackButton={false}
                isHandleClick={true}
            />
        </div>
    );
}

export default Amenity;
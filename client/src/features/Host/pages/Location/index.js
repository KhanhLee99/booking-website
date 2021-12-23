import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import hostApi from '../../../../api/hostApi';
import FooterHost from '../../components/FooterHost';
import PulseLoading from '../../../../components/Loading/PulseLoading';

Location.propTypes = {

};

function Location(props) {
    const history = useHistory()
    const { id } = useParams();
    const [loading, setLoading] = useState(false);


    const handleAddLocation = async (values) => {
        try {
            const params = {
                street_address: values.streetAddress
            }
            setLoading(true);
            await hostApi.updateListing(params, id).then(res => {
                setLoading(false);
                if (res.data.status == 'success') {
                    history.push(`/host/${id}/floor-plan`);
                }
            });
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    }

    const handleNext = (values) => {
        handleAddLocation(values);
    }

    const handleBack = () => {
        history.goBack();
    }

    return (
        <Formik
            initialValues={{ streetAddress: '' }}
            validationSchema={Yup.object({
                streetAddress: Yup.string()
                    // .max(15, 'Must be 15 characters or less')
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                handleNext(values);
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <div className='k-wrap'>
                        <div className='k-header'></div>
                        <div className='k-content'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-7 k-left-side'>
                                        <div id="add-listing">
                                            <div className="add-listing-section margin-top-45">
                                                {/* Headline */}
                                                <div className="add-listing-headline">
                                                    <h3><i className="sl sl-icon-location" /> Location</h3>
                                                </div>
                                                <div className="submit-section">
                                                    {/* Row */}
                                                    <div className="row with-forms">
                                                        {/* Country */}
                                                        <div className="col-md-12">
                                                            <h5>Country/ Region</h5>
                                                            <select className="">
                                                                <option>Vietnam</option>
                                                                <option>USA</option>
                                                            </select>
                                                        </div>

                                                        {/* Address */}
                                                        <div className="col-md-12">
                                                            <h5>Street Address</h5>
                                                            <input
                                                                id="streetAddress"
                                                                type="text"
                                                                placeholder="e.g. 964 School Street"
                                                                {...formik.getFieldProps('streetAddress')}
                                                            />
                                                        </div>

                                                        {/* City */}
                                                        <div className="col-md-6">
                                                            <h5>City</h5>
                                                            <input type="text" placeholder="Da Nang" />
                                                        </div>

                                                        {/* City */}
                                                        <div className="col-md-6">
                                                            <h5>State</h5>
                                                            <input type="text" />
                                                        </div>
                                                        {/* Zip-Code */}
                                                        <div className="col-md-6">
                                                            <h5>Zip-Code</h5>
                                                            <input type="text" />
                                                        </div>
                                                    </div>
                                                    {/* Row / End */}
                                                </div>
                                            </div>
                                            {/* Section / End */}

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
                            hiddenBackButton={false}
                            isHandleClick={false}
                        />
                    </div >
                </form>
            )}
        </Formik>
    );
}

export default Location;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import hostApi from '../../../../api/hostApi';
import FooterHost from '../../components/FooterHost';
import PulseLoading from '../../../../components/Loading/PulseLoading';
import listingApi from '../../../../api/listingApi';
import './styles.scss';
import Loading from '../../../../components/Loading/Loading';
import CommonAddListing from '../../../../components/CommonAddListing/CommonAddListing';
import TabAddListing from '../../components/TabAddListing/TabAddListing';

Location.propTypes = {

};

const custom_form_input = {
    float: 'left',
    border: '1px solid #e5e7f2',
    background: '#f9f9f9',
    width: '100%',
    padding: '15px 20px 15px 20px',
    borderRadius: '4px',
    color: '#7d93b2',
    fontSize: '12px',
    outline: 'none',
    overflow: 'hidden',
    zIndex: 1,
    boxShadow: 'none',
}

function Location(props) {
    const history = useHistory()
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [streetAddresss, setStreetAddress] = useState('');
    const [percent, setPercent] = useState(0);


    const handleAddLocation = async (values) => {
        try {
            const params = {
                street_address: values.streetAddress
            }
            setLoading(true);
            await hostApi.updateListing(params, id).then(res => {
                setLoading(false);
                if (res.data.status == 'success') {
                    history.push(`/become-host/${id}/floor-plan`);
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
        history.push(`/become-host/${id}/basic-infomation`);
    }

    useEffect(() => {
        const fetchListingDetail = async () => {
            await listingApi.getListingById(id).then(res => {
                setStreetAddress(res.data.data.listing.street_address);
                setPercent(100 / 7);
            });
        }

        fetchListingDetail();
    }, []);

    return (
        <CommonAddListing>
            <TabAddListing id={id} />
            <div className='row'>
                {loading && <Loading />}
                <div className='col-8'>
                    <Formik
                        enableReinitialize
                        initialValues={{ streetAddress: streetAddresss }}
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
                                <div id="add-listing">
                                    <h3 className='h3_title'>Location</h3>
                                    <div className="add-listing-section">
                                        <div className="submit-section">
                                            <div className="row with-forms">

                                                <div className="col-md-12">
                                                    <h5>Country/ Region</h5>
                                                    <select className="">
                                                        <option>Vietnam</option>
                                                        <option>USA</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-12">
                                                    <h5>Street Address</h5>
                                                    <input
                                                        id="streetAddress"
                                                        type="text"
                                                        placeholder="e.g. 964 School Street"
                                                        {...formik.getFieldProps('streetAddress')}
                                                        style={custom_form_input}
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <h5>City</h5>
                                                    <input
                                                        type="text"
                                                        placeholder="Da Nang"
                                                        style={custom_form_input}
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <h5>State</h5>
                                                    <input
                                                        type="text"
                                                        style={custom_form_input}
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <h5>Zip-Code</h5>
                                                    <input
                                                        type="text"
                                                        style={custom_form_input}
                                                    />
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
                                    now={percent}
                                />
                            </form>
                        )}
                    </Formik>
                </div>

                <RightSide />
            </div>
        </CommonAddListing>
    );
}

export default Location;

function RightSide(props) {
    return (
        <div className='col-4 k-right-side'>
            <div className='k-property-content'>
                <h5>Text</h5>
                <p>Lorem</p>
            </div>
        </div>
    )
}
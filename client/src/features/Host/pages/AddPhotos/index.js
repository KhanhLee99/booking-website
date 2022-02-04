import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone'

import './styles.scss';
import uploadApi from '../../../../api/uploadApi';
import FooterHost from '../../components/FooterHost';
import listingApi from '../../../../api/listingApi';
import Loading from '../../../../components/Loading/Loading';
import TabAddListing from '../../components/TabAddListing/TabAddListing';
import CommonAddListing from '../../../../components/CommonAddListing/CommonAddListing';

AddPhotos.propTypes = {

};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    // width: 500,
    height: '100%'
};

function AddPhotos(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [files, setFiles] = useState([]);
    const [params, setParams] = useState(new FormData());
    const [photos, setPhotos] = useState([]);
    const [percent, setPercent] = useState(100 / 5);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {

            const uploaders = acceptedFiles.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
            setFiles(files.concat(uploaders));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    const defaultThumbs = photos.map(photo => (
        <div style={thumb} key={photo.id}>
            <div style={thumbInner}>
                <img
                    src={photo.photo_url}
                    style={img}
                />
            </div>
        </div>
    ))



    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    useEffect(() => {
        const fetchListingDetail = async () => {
            // setLoadingListingDetail(true)
            await listingApi.getListingById(id).then(res => {
                setPhotos(res.data.data.photos);
                setPercent(100 / 4);
            });
        }

        fetchListingDetail();

        return () => {
            setPhotos([]);
        }
    }, []);

    const handleNext = async () => {
        try {
            await files.map(file => {
                setParams(params.append("image[]", file))
            })
            setLoading(true);
            await uploadApi.uploadPhotosListing(params, id).then(res => {
                setLoading(false);
                if (res.data.status == 'success') {
                    history.push(`/become-host/${id}/title`)
                }
            });

        } catch (err) {
            console.log(err.message)
            setLoading(false)
        }
    }

    const handleBack = () => {
        history.push(`/become-host/${id}/amenities`)
    }

    return (
        <CommonAddListing>
            <TabAddListing
                id={id}
                photo={true}
            />
            <div className='row'>
                {loading && <Loading />}
                <div className='col-8'>
                    <div id="add-listing">
                        <h3 className='h3_title'>Gallery</h3>
                        <div className="add-listing-section">
                            <div className="submit-section">
                                {/* <form action="/file-upload" className="dropzone" /> */}
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    {
                                        (files.length == 0) ? <><i className='sl sl-icon-plus'></i> Click here or drop files to upload</> : null
                                    }

                                    <aside style={thumbsContainer}>
                                        {defaultThumbs}
                                        {thumbs}
                                    </aside>
                                </div>
                            </div>
                        </div>
                        <FooterHost
                            loading={loading}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            hiddenBackButton={false}
                            isHandleClick={true}
                            now={percent}
                        />
                    </div>
                </div>
                <RightSide />
            </div>
        </CommonAddListing>
    );
}

export default AddPhotos;

function RightSide(props) {
    return (
        <div className='col-4 k-right-side'>
            <div className='k-property-content'>
                <h5>Text</h5>
                <p>Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recent</p>
            </div>
        </div>
    )
}
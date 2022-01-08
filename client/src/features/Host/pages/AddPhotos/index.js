import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone'

import './styles.scss';
import uploadApi from '../../../../api/uploadApi';
import FooterHost from '../../components/FooterHost';
import listingApi from '../../../../api/listingApi';

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
                setPhotos(res.data.photos);
            });
        }

        fetchListingDetail();
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
                    history.push(`/host/${id}/title`)
                }
            });

        } catch (err) {
            console.log(err.message)
            setLoading(false)
        }
    }

    const handleBack = () => {
    }

    return (

        <div id="add-listing">
            <h3 className='h3_title'>Gallery</h3>
            <div className="add-listing-section margin-top-45">
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
            />
        </div>



    );
}

export default AddPhotos;
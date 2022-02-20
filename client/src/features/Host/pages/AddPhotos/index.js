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
import { v4 as uuid_v4 } from "uuid";
import { MdLightbulb } from 'react-icons/md';

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
    marginBottom: 10,
    marginRight: 10,
    width: 'calc(50% - 10px)',
    height: 140,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    position: 'relative',
};

const img = {
    display: 'block',
    width: '100%',
    height: '100%',
    userSelect: 'none',
};

const div_more_opt = { position: 'absolute', right: 5, top: 5 }

const show_more_snopt = {
    float: 'left',
    fontSize: '28px',
    // marginLeft: '20px',
    color: '#70778b',
    cursor: 'pointer',
    background: '#fff',
    padding: '0 6px',
    lineHeight: '0px',
    borderRadius: '50%',
    boxShadow: '0 9px 16px rgb(58 87 135 / 20%)',
};

const show_more_snopt_tooltip = {
    position: 'absolute',
    minWidth: '120px',
    background: '#fff',
    top: 40,
    right: 1,
    borderRadius: '6px',
    border: '1px solid #eee',
    transition: 'all 0.2s ease-in-out',
    padding: '5px 0',
}

const show_more_snopt_tooltip_a = {
    display: 'block',
    color: 'rgb(80, 89, 110)',
    fontWeight: 500,
    textAlign: 'left',
    padding: '6px 15px',
    fontSize: '13px',
    marginLeft: '6px',
    userSelect: 'none',
}

const isFile = (id) => {
    return (typeof id == 'string') ? true : false;
}

function AddPhotos(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [files, setFiles] = useState([]);
    const [params, setParams] = useState(new FormData());
    const [photos, setPhotos] = useState([]);
    const [percent, setPercent] = useState(100 / 7 * 3);
    const [avatarListing, setAvatarListing] = useState();

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {

            const uploaders = acceptedFiles.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )

            setFiles(files.concat(uploaders.map(item => ({
                id: uuid_v4(),
                popup: false,
                file: item,
            }))));
        }
    });

    // photos upload
    const thumbs = files.map(file => (
        <div style={thumb} key={file.id}>
            <div style={thumbInner}>
                <img
                    src={file.file.preview}
                    style={img}
                />
                <div
                    style={div_more_opt}
                    onClick={() => { showPopupOpt(file) }}
                >
                    <div style={show_more_snopt}><i className="fal fa-ellipsis-h" /></div>
                </div>
                <div
                    style={show_more_snopt_tooltip}
                    className={file.popup ? '' : 'display-none'}
                >
                    <a className='show_more_snopt_tooltip_a' style={show_more_snopt_tooltip_a} href="#" onClick={(e) => { e.preventDefault(); delPhoto(file) }}>Delete</a>
                    <a className='show_more_snopt_tooltip_a' style={show_more_snopt_tooltip_a} href="#" onClick={(e) => { e.preventDefault(); setAva(file) }}>Set thumbnail </a>
                </div>
            </div>
        </div>
    ));

    // photos added
    const defaultThumbs = photos.map(photo => (
        <div style={thumb} key={photo.id}>
            <div style={thumbInner}>
                <img
                    src={photo.photo_url}
                    style={img}
                />
                <div
                    style={div_more_opt}
                    onClick={() => { showPopupOpt(photo) }}
                >
                    <div style={show_more_snopt}><i className="fal fa-ellipsis-h" /></div>
                </div>
                <div
                    style={show_more_snopt_tooltip}
                    className={photo.popup ? '' : 'display-none'}
                >
                    <a className='show_more_snopt_tooltip_a' style={show_more_snopt_tooltip_a} href="#" onClick={(e) => { e.preventDefault(); delPhoto(photo) }}>Delete</a>
                    <a className='show_more_snopt_tooltip_a' style={show_more_snopt_tooltip_a} href="#" onClick={(e) => { e.preventDefault(); setAva(photo) }}>Set thumbnail </a>
                </div>
            </div>

        </div>
    ))

    const showPopupOpt = (photo) => {
        if (isFile(photo.id)) {
            let tmpFiles = [...files];
            const index = tmpFiles.findIndex(item => item.id === photo.id);
            if (index > -1) {
                tmpFiles[index].popup = !tmpFiles[index].popup;
                setFiles(tmpFiles);
            }
        } else {
            let tmpPhotos = [...photos];
            const index = tmpPhotos.findIndex(item => item.id === photo.id);
            if (index > -1) {
                tmpPhotos[index].popup = !tmpPhotos[index].popup;
                setPhotos(tmpPhotos);
            }
        }
    }

    const delPhoto = (photo) => {
        if (isFile(photo.id)) {
            setFiles(files.filter(item => item.id != photo.id));
        } else {
            deletePhotoApi(photo);
            setPhotos(photos.filter(item => item.id != photo.id));
        }
    }

    const setAva = async (photo) => {
        if (isFile(photo.id)) {
            const formData = new FormData();
            formData.append(
                "file",
                photo.file,
            );
            await uploadApi.uploadThumbnail(formData, id).then(res => {
                setAvatarListing(photo.file.preview);
                alert('Done');
            });
        } else {
            const params = {
                avatar_url: photo.photo_url
            }
            await listingApi.updateListingAvatar(params, id).then(res => {
                setAvatarListing(photo.photo_url);
                alert('Done');
            })
        }
    }

    const deletePhotoApi = (photo) => {
        listingApi.deletePhotoListing(photo.id);
    }

    const thumbnailPhoto = () => {

        if (avatarListing) {
            return (
                <Thumbnail avatarListing={avatarListing} />
            )
        } else {
            if (files.length > 0) {
                return <Thumbnail avatarListing={files[0].file.preview} />
            }
        }
    }

    const handleNext = async () => {
        try {
            if ((photos.length + files.length) < 8) {
                alert('Hãy đăng ít nhất 8 ảnh về phòng của bạn.');
            } else {
                if (photos.length > 0 && files.length == 0) {
                    history.push(`/become-host/${id}/title`)
                } else {
                    files.map(file => {
                        setParams(params.append("image[]", file.file))
                    })
                    setLoading(true);
                    await uploadApi.uploadPhotosListing(params, id).then(res => {
                        setLoading(false);
                        if (res.data.status == 'success') {
                            history.push(`/become-host/${id}/title`)
                        }
                    });
                }
            }
        } catch (err) {
            console.log(err.message)
            setLoading(false)
        }
    }

    const handleBack = () => {
        history.push(`/become-host/${id}/amenities`)
    }

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    useEffect(() => {
        const fetchListingDetail = async () => {
            await listingApi.getListingById(id).then(res => {
                setPhotos(res.data.data.photos.map(obj => ({ ...obj, popup: false })));
                setAvatarListing(res.data.data.listing.avatar_url);
                setPercent(100 / 7 * 4);
            });
        }

        fetchListingDetail();

        return () => {
            setPhotos([]);
        }
    }, []);

    return (
        <CommonAddListing>
            <TabAddListing
                id={id}
                photo={true}
            />
            <div className='row'>
                {loading && <Loading />}
                <div className='col-9'>
                    <div id="add-listing">
                        <h3 className='h3_title'>Photos</h3>
                        <div className="add-listing-section">
                            {thumbnailPhoto()}
                            <h3 className='h3_title'>Gallery</h3>
                            {/* <p>Hãy đăng ít nhất 5 ảnh về phòng của bạn.</p> */}
                            <div className="submit-section">
                                {/* <form action="/file-upload" className="dropzone" /> */}
                                <aside style={thumbsContainer}>
                                    {defaultThumbs}
                                    {thumbs}
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        <i className='fal fa-image' style={{ fontSize: '40px', color: '#d0d0d0' }}></i>
                                    </div>
                                </aside>
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
        <div className='col-3 k-right-side'>
            <div className='k-property-content'>
                <h5><MdLightbulb fontSize={30} color='#4db7fe' /></h5>
                <p style={{ fontWeight: 500, color: '#7d93b2', fontSize: 13 }}>Every listing need at least 8 photos. Including photos of all the spaces imagine staying at your place. Show your customers all of your spaces.</p>
            </div>
        </div>
    )
}

function Thumbnail(props) {
    const { avatarListing } = props;
    return (
        <div style={{ paddingBottom: '20px' }}>
            <h3 className='h3_title'>Thumbnail</h3>
            <div style={{ width: 'calc(100% - 10px)', height: '190px', border: '1px solid #eaeaea', padding: 4, boxSizing: 'border-box', }}>
                <img
                    src={avatarListing}
                    style={img}
                />
            </div>
        </div>
    )
}
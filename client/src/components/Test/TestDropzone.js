import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import uploadApi from '../../api/uploadApi';
import { param } from 'jquery';
import { useParams } from 'react-router-dom';



TestDropzone.propTypes = {

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


function TestDropzone(props) {
    const { id } = useParams();
    const [files, setFiles] = useState([]);
    const [params, setParams] = useState(new FormData());

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

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const handleUpload = async () => {
        await files.map(file => {
            setParams(params.append("image[]", file))
        })
        const res = await uploadApi.uploadPhotosListing(params, id);
        console.log(res);
    }

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {
                    (files.length == 0) ? <><i className='sl sl-icon-plus'></i> Click here or drop files to upload</> : null
                }

                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>
            </div>

            <button onClick={() => handleUpload()}>Upload</button>
        </section>
    );
}

export default TestDropzone;
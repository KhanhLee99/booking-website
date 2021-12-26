import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import ReactPlaceholder from "react-placeholder";

ImageItem.propTypes = {

};

function ImageItem(props) {

    const [loaded, setLoaded] = useState(false);

    const { image } = props;

    const imageStyle = !loaded ? { display: "none" } : {};

    const handleImageLoaded = () => {
        setLoaded(true)
    }


    return (
        <Fragment>
            <ReactPlaceholder type="rect" ready={loaded} color="#f7f7f7" style={{ height: 400 }} >
                <div className="imageHolder" >
                    <img src={image.photo_url} className='height-img' style={imageStyle} onLoad={handleImageLoaded} />
                </div>
            </ReactPlaceholder>
            {!loaded && <img src={image.photo_url} className='height-img' style={imageStyle} onLoad={handleImageLoaded} />}
        </Fragment >
    );
}

export default ImageItem;
import React from 'react';
import PropTypes from 'prop-types';
import avatarPlacholder from '../../../assets/placeholder/avatar-placeholder.png'

AvatarPlaceholder.propTypes = {

};

function AvatarPlaceholder(props) {

    const { avatar_url, className, style } = props;
    return (
        <>
            {
                avatar_url ?
                    <img
                        src={avatar_url}
                        className={className}
                        style={style}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = avatarPlacholder;
                        }}
                    />
                    :
                    <img src={avatarPlacholder} />
            }
        </>
    );
}

export default AvatarPlaceholder;
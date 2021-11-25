import React from "react";
import PropTypes from 'prop-types';

Page3.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool
}

Page3.defaulProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false
}

function Page3(props) {
    const { field, form, type, label, placeholder, disabled } = props;
    const { name } = field;
    return (
        <>
            {label && <label>{label}</label>}
            <input
                id={name}
                {... field}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
            />
            <br/>
        </>
    );
}

export default Page3;
import React, { forwardRef, useEffect } from 'react';

const OutsideAlerter = forwardRef((props, ref) => {
    const { closePopup } = props;

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref) {
                if (ref.current && !ref.current.contains(event.target)) {
                    closePopup();
                }
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return <div ref={ref}>{props.children}</div>;
})

export default OutsideAlerter;
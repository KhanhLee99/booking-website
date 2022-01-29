import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

PayPal.propTypes = {

};

function PayPal(props) {
    const paypal = useRef();

    const { total_usd, handleNext } = props;

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Cool looking table",
                                amount: {
                                    currency_code: "USD",
                                    value: 0.01,
                                    // value: total_usd.toFixed(1),
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    await actions.order.capture().then(order => {
                        console.log(order);
                        handleNext();
                    });
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}

export default PayPal;
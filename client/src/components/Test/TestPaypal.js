import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { PayPalButton } from "react-paypal-button-v2";

TestPaypal.propTypes = {

};

function TestPaypal(props) {

    const paypal = useRef();

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
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        // <PayPalButton
        //     amount="0.01"
        //     // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        //     onSuccess={(details, data) => {
        //         alert("Transaction completed by " + details.payer.name.given_name);

        //         // OPTIONAL: Call your server to save the transaction
        //         return fetch("/paypal-transaction-complete", {
        //             method: "post",
        //             body: JSON.stringify({
        //                 orderId: data.orderID
        //             })
        //         });
        //     }}
        //     options={{
        //         clientId: "AbCtGGh4rgiD5rZrLSJ5XfAz_ZMEfoAUVBaNdXO8C0G9V04pASAWwhfMm8vDjRG4shZ8zW4QFHABRR_e"
        //     }}
        // />

        <div>
            <div ref={paypal}></div>
        </div>
    );
}

export default TestPaypal;
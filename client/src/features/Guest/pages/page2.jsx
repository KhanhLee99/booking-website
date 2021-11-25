import { Formik, Form, FastField } from "formik";
import React from "react";
import Page3 from "./page3";
import { Button, FormGroup, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';


Page2.propTypes = {
    onSubmit: PropTypes.func,
  };
  
  Page2.defaultProps = {
    onSubmit: null,
  }

function Page2(props) {
    const { initialValues } = props


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={props.onSubmit}
        >
            {formikProps => {
                const { values, errors, touched } = formikProps;
                // console.log({ values, errors, touched });
                return (
                    <Form>
                        <FastField
                            name="email"
                            component={Page3}

                            label="email"
                            placeholder="email"
                            type="text"
                        />
                        <FastField
                            name="password"
                            component={Page3}

                            label="password"
                            placeholder="password"
                            type="password"
                        />

                        <FormGroup>
                            <Button type="submit">
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default Page2;
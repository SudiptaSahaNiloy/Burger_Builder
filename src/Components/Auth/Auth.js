import { Formik } from 'formik';
import { Component } from 'react';

class Auth extends Component {
    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        passwordConfirm: "",
                    }}

                    onSubmit={(values) => {
                        console.log("Values: ", values);
                    }}

                    validate={(values) => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = "**Required";
                        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
                            errors.email = "**Invalid Email Address";
                        }

                        if (!values.password) {
                            errors.password = "**Required";
                        } else if (values.password.length < 4) {
                            errors.password = "**Must be at least 4 characters!";
                        }

                        if (!values.passwordConfirm) {
                            errors.passwordConfirm = "**Required";
                        } else if (values.password !== values.passwordConfirm) {
                            errors.passwordConfirm = "**Password field doesn't match!"
                        }
                        // console.log("Errors: ", errors);
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => {
                        return (
                            <div style={{
                                border: "1px gray solid",
                                padding: "15px",
                                borderRadius: "7px",
                            }}>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        name="email"
                                        placeholder="Enter your email"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={values.email} />
                                    <span style={{ color: "red" }}>{errors.email}</span>
                                    <br />
                                    <input
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        onChange={handleChange}
                                        className="form-control"
                                        value={values.password} />
                                    <span style={{ color: "red" }}>{errors.password}</span>
                                    <br />
                                    <input
                                        name="passwordConfirm"
                                        placeholder="Re-enter Password"
                                        type="password"
                                        onChange={handleChange}
                                        className="form-control"
                                        value={values.passwordConfirm} />
                                    <span style={{ color: "red" }}>{errors.passwordConfirm}</span>
                                    <br />
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-success">Sign up</button>
                                    </div>
                                </form>
                            </div>
                        )
                    }}
                </Formik>
            </div>
        )
    }
}

export default Auth;
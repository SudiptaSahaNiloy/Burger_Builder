import { Formik } from 'formik';
import { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../Redux/authActionCreators';

const mapDispatchToProps = (dispatch) => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

class Auth extends Component {
    state = {
        mode: "Sign Up",
    }

    switchModeHandler = () => {
        this.setState({
            mode: this.state.mode === 'Sign Up' ? "Login" : "Sign Up"
        })
    }

    goBack = () => {
        this.props.history.goBack("/");
    }

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
                        this.props.auth(values.email, values.password, this.state.mode);
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

                        if (this.state.mode === 'Sign Up') {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = "**Required";
                            } else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = "**Password field doesn't match!"
                            }
                        }
                        // console.log("Errors: ", errors);
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => {
                        return (
                            <div style={{
                                width: "60%",
                                border: "1px gray solid",
                                padding: "45px",
                                borderRadius: "7px",
                                marginTop: "10rem",
                                justifyContent: "center",
                            }} className="mx-auto">
                                <h1 style={{ textAlign: "center" }}>{this.state.mode === 'Sign Up' ? "Sign Up" : "Login"} Form</h1><br /><br />
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
                                    {this.state.mode === 'Sign Up' ?
                                        <div>
                                            <input
                                                name="passwordConfirm"
                                                placeholder="Re-enter Password"
                                                type="password"
                                                onChange={handleChange}
                                                className="form-control"
                                                value={values.passwordConfirm} />
                                            <span style={{ color: "red" }}>{errors.passwordConfirm}</span>
                                            <br />
                                        </div> : null}
                                    <div className="d-flex justify-content-center">
                                        <button style={{
                                            backgroundColor: "#D70F64",
                                            color: "white"
                                        }} type="button" className="btn btn-large me-2" onClick={this.switchModeHandler}>
                                            Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}
                                        </button>
                                        <button type="submit" className="btn btn-success">
                                            {this.state.mode === 'Sign Up' ? "Sign Up" : "Login"}
                                        </button>
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

export default connect(null, mapDispatchToProps)(Auth);
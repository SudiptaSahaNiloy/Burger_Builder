import axios from "axios";
import { Field, Formik } from "formik";
import { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import { resetIngredient } from "../../../Redux/actionCreators";
import Spinner from "../../Spinner/Spinner";

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetIngredient: () => dispatch(resetIngredient())
    }
}

class check_out extends Component {
    goBack = () => {
        this.props.history.goBack("/");
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        customer: {
                            deliveryAddress: "",
                            phone: "",
                            paymentType: "Cash on Delivery",
                        },
                        isLoading: false,
                        isModalOpen: false,
                        modalMsg: "",
                    }}

                    onSubmit={(values) => {
                        const order = {
                            ingredients: this.props.ingredients,
                            customer: values.customer,
                            price: this.props.totalPrice,
                            orderTime: new Date()
                        }

                        axios.post('https://construct-burger-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', order)
                            .then(response => {
                                if (response.status === 200) {
                                    values.isLoading = false;
                                    values.isModalOpen = true;
                                    values.modalMsg = "Order Placed Successfully!!";
                                    this.props.resetIngredient();
                                } else {
                                    values.isLoading = false;
                                    values.isModalOpen = true;
                                    values.modalMsg = "Something went wrong!! Try again";
                                }
                            })
                            .catch(error => {
                                values.isLoading = false;
                                values.isModalOpen = true;
                                values.modalMsg = "Something went wrong!! Try again";
                            })
                    }}

                    validate={(values) => {
                        const errors = {};

                        if (!values.customer.deliveryAddress) {
                            errors.deliveryAddress = "**Required";
                        }

                        if (!values.customer.phone) {
                            errors.phone = "**Required";
                        } else if (!/(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/.test(values.customer.phone)) {
                            errors.password = "**Use Valid Phone number";
                        }

                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => {
                        return (
                            <div>
                                {values.isLoading ? <Spinner /> :
                                    <div>
                                        <h4 style={{
                                            border: "1px solid grey",
                                            boxShadow: "1px 1px #888888",
                                            borderRadius: "5px",
                                            padding: "20px",
                                        }}>Payment: {this.props.totalPrice} BDT</h4>

                                        <form onSubmit={handleSubmit} style={{
                                            border: "1px solid grey",
                                            boxShadow: "1px 1px #888888",
                                            borderRadius: "5px",
                                            padding: "20px",
                                        }}>
                                            <Field
                                                name="customer.deliveryAddress"
                                                value={values.customer.deliveryAddress}
                                                placeholder="Your Delivery Address"
                                                className="form-control"
                                                onChange={handleChange} />
                                            <span style={{ color: "red" }}>{errors.deliveryAddress}</span>
                                            <br />
                                            <Field
                                                name="customer.phone"
                                                className="form-control"
                                                onChange={handleChange}
                                                placeholder="Your Phone Number"
                                                value={values.customer.phone} />
                                            <span style={{ color: "red" }}>{errors.phone}</span>
                                            <br />
                                            <label htmlFor="paymentOption">Select a payment option</label>
                                            <select
                                                id="paymentOption"
                                                style={{ WebkitAppearance: "menulist-button" }}
                                                name="customer.paymentType" className="form-control"
                                                onChange={handleChange}
                                                value={values.customer.paymentType}>
                                                <option value="CashOnDelivery">Cash on Delivery</option>
                                                <option value="Bkash">Bkash</option>
                                            </select>
                                            <br />
                                            <div className="d-flex justify-content-center">
                                                <Button color="secondary" onClick={this.goBack}>Cancel</Button>
                                                <button
                                                    type="submit"
                                                    style={{ backgroundColor: "#D70F64" }}
                                                    className="ms-1 btn btn-success"
                                                    disabled={!this.props.purchasable}>
                                                    Place Order
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                }
                                <Modal isOpen={values.isModalOpen} onClick={this.goBack}>
                                    <ModalBody>
                                        <p>{values.modalMsg}</p>
                                    </ModalBody>
                                </Modal>
                            </div>
                        )
                    }}

                </Formik>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(check_out);
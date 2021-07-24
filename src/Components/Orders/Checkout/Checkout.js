import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import Spinner from "../../Spinner/Spinner";
import { resetIngredient } from '../../../Redux/actionCreators';

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

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash on Delivery"
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    }

    goBack = () => {
        this.props.history.goBack("/");
    }

    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }

    submitHandler = () => {
        this.setState({ isLoading: true })
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date()
        }

        axios.post('https://construct-burger-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order Placed Successfully!!"
                    });
                    this.props.resetIngredient();
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something went wrong!! Try again",
                    })
                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something went wrong!! Try again",
                })
            })
    }

    render() {
        let form = (
            <div>
                <h4 style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px",
                }}>Payment: {this.props.totalPrice} BDT</h4>

                <form style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px",
                }}>
                    <textarea
                        name="deliveryAddress"
                        value={this.state.values.deliveryAddress}
                        placeholder="Your Delivery Address"
                        className="form-control"
                        onChange={(e) => this.inputChangeHandler(e)} />
                    <br />
                    <input
                        name="phone"
                        className="form-control"
                        onChange={(e) => this.inputChangeHandler(e)}
                        placeholder="Your Phone Number"
                        value={this.state.values.phone} />
                    <br />
                    <label htmlFor="paymentOption">Select a payment option</label>
                    <select
                        id="paymentOption"
                        style={{ WebkitAppearance: "menulist-button" }}
                        name="paymentType" className="form-control"
                        onChange={(e) => this.inputChangeHandler(e)}
                        value={this.state.values.paymentType}>
                        <option value="CashOnDelivery">Cash on Delivery</option>
                        <option value="Bkash">Bkash</option>
                    </select>
                    <br />
                    <div className="d-flex justify-content-center">
                        <Button color="secondary" onClick={this.goBack}>Cancel</Button>
                        <Button
                            style={{ backgroundColor: "#D70F64" }}
                            className="ms-1"
                            onClick={this.submitHandler}
                            disabled={!this.props.purchasable}>
                            Place Order
                        </Button>
                    </div>
                </form>
            </div>
        )
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
import { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../Redux/actionCreators";
import SingleOrder from "./Order/SingleOrder.js";
import Spinner from '../Spinner/Spinner'

const mapDispatchToState = (dispatch) => {
    return {
        fetchOrders: () => dispatch(fetchOrders()),
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
    }
}

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        let orders = null;
        if (this.props.orderErr) {
            orders = <p style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
                marginBottom: "10px",
                textAlign: "center",
            }}>Sorry failed to load orders</p>
        } else {
            if (this.props.orders.length === 0) {
                orders = <p style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px",
                    marginBottom: "10px",
                    textAlign: "center",
                }}>You have no orders!!</p>
            } else {
                orders = this.props.orders.map((item) => {
                    return (
                        <SingleOrder order={item} key={item.id} />
                    )
                })
            }
        }
        return (
            <div>
                {this.props.orderLoading ? <Spinner /> : orders}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToState)(Orders);

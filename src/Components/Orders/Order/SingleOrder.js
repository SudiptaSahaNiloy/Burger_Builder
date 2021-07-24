import axios from "axios"
import { Component } from "react";
import { Button } from "reactstrap"
import { baseURL } from "../../../Redux/baseURL";

class singleOrder extends Component {
    componentDidCatch() {
        console.log(this.props);
    }

    deleteOrder = () => {
        // console.log(baseURL.concat(this.props.order.id));
        axios.delete(baseURL.concat(`${this.props.order.id}.json`))
            .then(response => {
                window.location.reload();
            })
    }

    render() {
        const ingredientSummary = this.props.order.ingredients.map((item) => {
            return (
                <span style={{
                    border: "1px solid grey",
                    borderRadius: "5px",
                    padding: "5px",
                    marginRight: "10px",
                    textAlign: "center",
                }} key={item.type}>{item.amount} x <span style={{ textTransform: "capitalize" }}>{item.type}</span></span>
            )
        })

        return (
            <div style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
                marginBottom: "10px",
                textAlign: "center",
            }}>
                <p>Order Number: {this.props.order.id}</p>
                <p>Delivery Address: {this.props.order.customer.deliveryAddress}</p>
                <hr />
                {ingredientSummary}
                <hr />
                <p>Total: {this.props.order.price}</p>
                <Button color="danger" onClick={this.deleteOrder}>Delete</Button>
            </div>
        )
    }

}

export default singleOrder;

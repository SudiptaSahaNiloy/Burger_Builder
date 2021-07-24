const singleOrder = (props) => {
    const ingredientSummary = props.order.ingredients.map((item) => {
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
            <p>Order Number: {props.order.id}</p>
            <p>Delivary Address: {props.order.customer.deliveryAddress}</p>
            <hr />
            {ingredientSummary}
            <hr />
            <p>Total: {props.order.price}</p>
        </div>
    )
}

export default singleOrder;

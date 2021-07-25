import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
// import Checkout from "./Orders/Checkout/Checkout";
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from "./Auth/Auth";
import check_out from "./Orders/Checkout/check_out";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        token: state.token,
    }
}

const MainComponent = (props) => {
    let route = null;

    if (props.token === null) {
        route = (
            <Switch>
                <Route path="/login" component={Auth} />
                <Redirect to="/login" />
            </Switch>
        )
    } else {
        route = (
            <Switch>
                <Route path="/orders" component={Orders} />
                <Route path="/checkout" component={check_out} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        )
    }
    return (
        <div>
            <Header />
            <div className="container">
                {route}
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(MainComponent);

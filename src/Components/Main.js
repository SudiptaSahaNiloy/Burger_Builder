import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from "./Auth/Auth";
import check_out from "./Orders/Checkout/check_out";
import { connect } from "react-redux";
import { authCheck } from "../Redux/authActionCreators";
import { Component } from "react";
import Logout from "./Auth/Logout";

const mapStateToProps = (state) => {
    return {
        token: state.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class MainComponent extends Component {
    componentDidMount() {
        this.props.authCheck();
    }

    render() {
        let route = null;

        if (this.props.token === null) {
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
                    <Route path="/logout" component={Logout} />
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

}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

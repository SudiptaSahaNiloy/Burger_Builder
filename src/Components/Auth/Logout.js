import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logOut } from "../../Redux/authActionCreators";

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut()),
    }
}

class Logout extends Component {
    componentDidMount() {
        this.props.logOut();
    }
    render() {
        return (<Redirect to="/" />)
    }
}

export default connect(null, mapDispatchToProps)(Logout);
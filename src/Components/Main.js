import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
// import Checkout from "./Orders/Checkout/Checkout";
import { Route } from 'react-router-dom';
import Auth from "./Auth/Auth";
import check_out from "./Orders/Checkout/check_out";

const MainComponent = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <Route path="/login" component={Auth} />
                <Route path="/orders" component={Orders} />
                <Route path="/checkout" component={check_out} />
                <Route path="/" exact component={BurgerBuilder} />
            </div>
        </div>
    )
}

export default MainComponent;

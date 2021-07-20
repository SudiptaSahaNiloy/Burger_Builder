import BreadTop from '../../../assets/Images/top.png';
import BreadBottom from '../../../assets/Images/bottom.png';
import Meat from '../../../assets/Images/meat.png';
import Salad from '../../../assets/Images/salad.png';
import Cheese from '../../../assets/Images/cheese.png';
import '../../../Stylesheet/Ingredient.css'

const Ingredients = (props) => {
    let ingredient = null;

    switch (props.type) {
        case 'bread-top':
            ingredient = <div>
                <img src={BreadTop} alt="Top Bread" />
            </div>
            break;
        case 'bread-bottom':
            ingredient = <div>
                <img src={BreadBottom} alt="Bottom Bread" />
            </div>
            break;
        case 'meat':
            ingredient = <div>
                <img src={Meat} alt="Meat" />
            </div>
            break;
        case 'salad':
            ingredient = <div>
                <img src={Salad} alt="Salad" />
            </div>
            break;
        case 'cheese':
            ingredient = <div>
                <img src={Cheese} alt="Bread-Top" />
            </div>
            break;
        default:
            ingredient = null;
            break;
    }
    return (
        <div className="Ingredient">
            {ingredient}
        </div>
    )
}

export default Ingredients;
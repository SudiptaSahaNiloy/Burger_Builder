import Ingredients from "../Ingredients/Ingredients";
import '../../../Stylesheet/Burger.css';

const Burger = (props) => {
    let ingredientArr = props.ingredients.map((item) => {
        let amountArr = [...Array(item.amount).keys()];
        return amountArr.map(() => {
            return <Ingredients type={item.type} key={Math.random()} />
        })
    })
    // .reduce((arr, element) => {
    //     console.log("Array:", arr, "Element:", element);
    //     return arr.concat(element);
    // }, []);

    console.log(...ingredientArr);
    if (ingredientArr.length === 0) {
        ingredientArr = <p>Please Add Some Ingredients</p>
    }
    return (
        <div className="Burger">
            <Ingredients type="bread-top" />
            {ingredientArr}
            <Ingredients type="bread-bottom" />
        </div>
    );
}

export default Burger;
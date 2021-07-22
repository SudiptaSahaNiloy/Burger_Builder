import { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";

const ingredientsPrices = {
    salad: 20,
    cheese: 40,
    meat: 90
}

export default class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'cheese', amount: 0 },
            { type: 'meat', amount: 0 }
        ],
        totalPrice: 80
    }

    addIngredientHandle = (type) => {
        const ingredients = [...this.state.ingredients];
        const newPrice = this.state.totalPrice + ingredientsPrices[type];
        for (let item of ingredients) { //iterates value of array
            if (item.type === type) {
                item.amount++;
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        })
    }

    removeIngredientHandle = (type) => {
        const ingredients = [...this.state.ingredients];
        const newPrice = this.state.totalPrice - ingredientsPrices[type];
        for (let item of ingredients) { //iterates value of array
            if (item.type === type) {
                if (item.amount !== 0)
                    item.amount--;
            }
        }
        if (newPrice >= 80) {
            this.setState({
                ingredients: ingredients,
                totalPrice: newPrice
            })
        }

    }

    render() {
        return (
            <div className="d-flex flex-md-row flex-column">
                <Burger ingredients={this.state.ingredients} />
                <Controls
                    ingredientsAdded={this.addIngredientHandle}
                    ingredientsRemoved={this.removeIngredientHandle}
                    price={this.state.totalPrice} />
            </div>
        )
    }
}
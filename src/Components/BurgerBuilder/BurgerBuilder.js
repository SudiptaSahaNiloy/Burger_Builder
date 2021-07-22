import { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import Summary from "./Summary/Summary";

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
        totalPrice: 80,
        modalOpen: false,
        purchasable: false
    }

    addIngredientHandle = (type) => {
        const ingredients = [...this.state.ingredients];
        const newPrice = this.state.totalPrice + ingredientsPrices[type];
        for (let item of ingredients) { //iterates value of array
            if (item.type === type) {
                item.amount++;
            };
        };
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        });
        this.updatePurchasable(ingredients);
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
        this.updatePurchasable(ingredients);
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    updatePurchasable = (ingredients) => {
        const sum = ingredients.reduce((sum, element) => {
            return sum + element.amount;
        }, 0)
        this.setState({
            purchasable: sum > 0
        });
    }

    handleCheckout = () => {
        this.props.history.push("/checkout");
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.state.ingredients} />
                    <Controls
                        ingredientsAdded={this.addIngredientHandle}
                        ingredientsRemoved={this.removeIngredientHandle}
                        price={this.state.totalPrice}
                        toggleModal={this.toggleModal}
                        purchasable={this.state.purchasable} />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.state.totalPrice.toFixed(0)} BDT</h5>
                        <Summary ingredients={this.state.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal} >Cancel</Button>
                        <Button color="success" onClick={this.handleCheckout}>Continue to Checkout</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
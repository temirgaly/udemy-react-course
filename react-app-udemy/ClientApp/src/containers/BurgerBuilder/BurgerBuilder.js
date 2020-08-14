import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../.././/components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4
        }
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const ingredientPrice = INGREDIENT_PRICES[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };
        const updatedPrice = this.state.totalPrice + ingredientPrice;
        updatedIngredients[type] = updatedCount;
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] === 0) return;

        const updatedCount = this.state.ingredients[type] - 1;
        const ingredientPrice = INGREDIENT_PRICES[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };
        const updatedPrice = this.state.totalPrice - ingredientPrice;
        updatedIngredients[type] = updatedCount;
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0;

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;
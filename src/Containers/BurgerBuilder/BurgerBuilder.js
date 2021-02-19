import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-order';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchase(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el) => {
            return sum+el;
        },0);
        return sum>0;
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You Continue');
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null; 
        let burger = this.props.error? <p>Ingredients can't be loaded</p>:<Spinner/>;
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        disabled = {disabledInfo}
                        purchaseable = {!this.updatePurchase(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        ingredientsRemoved = {this.props.onIngredientRemoved}
                        ingredientsAdded = {this.props.onIngredientAdded}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
            price={this.props.price.toFixed(2)}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.props.ings}/>;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeInredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
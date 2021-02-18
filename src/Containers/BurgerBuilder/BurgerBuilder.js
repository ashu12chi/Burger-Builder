import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount () {
        // axios.get('https://react-my-burger-91ac2-default-rtdb.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // }).catch(error => {
        //     this.setState({error:true});
        // })
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
        let burger = this.state.error? <p>Ingredients can't be loaded</p>:<Spinner/>;
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
        if(this.state.loading) {
            orderSummary = <Spinner/>;
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
        price: state.totalPrice
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
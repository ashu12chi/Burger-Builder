import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

    checkoutCancelHandeler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary 
                onCheckoutCancelled={this.checkoutCancelHandeler}
                onCheckoutContinued={this.checkoutContinueHandler}
                ingredients={this.props.ings}/>
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);
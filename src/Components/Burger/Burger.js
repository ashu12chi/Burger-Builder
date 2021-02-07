import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngrdients = Object.keys(props.ingredients).map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey+i} type={igKey}/>
        });
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[]);
    if(transformedIngrdients.length == 0) {
        transformedIngrdients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngrdients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
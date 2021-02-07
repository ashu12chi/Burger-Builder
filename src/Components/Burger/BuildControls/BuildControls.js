import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            disabled={props.disabled[ctrl.type]}
            label={ctrl.label}
            removed={()=>props.ingredientsRemoved(ctrl.type)}
            added={()=>props.ingredientsAdded(ctrl.type)}/>
        ))}
        <button 
            className={classes.OrderButton}
            onClick={props.ordered}
            disabled={props.purchaseable}>ORDER NOW</button>
    </div>
);

export default buildControls;
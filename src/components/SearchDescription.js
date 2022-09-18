import React, { Component } from "react";

function Sonnet(props) {
    return (
        <div>
            <img className="drinkThumb" src={props.thumb} alt={props.instructions} />
            <p>{props.instructions}</p>
            <p>{props.recipe}</p>
        </div>
    );
}

export default Sonnet;
import moment from "moment";
import React from "react";

const Break = ({
    breakLenght,
    decrementBreakLengthByOneMinute,
    incrementBreakLengthByOneMinute,
    enabledButton
 }) => {
    
    const breakLengthInMinute = moment.duration(breakLenght, 's').minutes()
    return (
    <div>
    <p id="break-label">Break</p>  
    <p id="break-lenght">{breakLengthInMinute}</p>
    <button disabled={!enabledButton} className="btn btn-primary" id="break-decrement" onClick={decrementBreakLengthByOneMinute}>-</button>
    <button disabled={!enabledButton} className="btn btn-primary" id="break-increment" onClick={incrementBreakLengthByOneMinute}>+</button>

    </div>
    );
};

export default Break;
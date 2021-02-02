import moment from "moment";
import React from "react";

const Session = ({
    sessionLenght,
    decrementSessionLengthByOneMinute,
    incrementSessionLengthByOneMinute,
    enabledButton
} ) => {
    
    const sessionLengthInMinute = moment.duration(sessionLenght, 's').minutes()
    return (
    <div id="sess">
    <p id="session-label"> Session</p>  
    <p id="session-lenght">{sessionLengthInMinute}</p>
    <div id="flex-s"><button disabled={!enabledButton} className="btn btn-primary" id="session-decrement" onClick={decrementSessionLengthByOneMinute}>-</button>
    <button disabled={!enabledButton} className="btn btn-primary" id="session-increment" onClick={incrementSessionLengthByOneMinute}>+</button></div>

    </div>
    );
};

export default Session;
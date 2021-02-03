import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

momentDurationFormatSetup (moment)

const TimeLeft = ({handleStartStopClick, startStopButtonLabel, timeLeft, timerLabel}) => {
    
    const formattedTimeLeft = moment.duration(timeLeft, "s").format("mm:ss", {trim: false})
    return <div> 
    <p id="timer-label">{timerLabel}</p>
    <h1 id="time-left">{formattedTimeLeft}</h1>
    <button className="btn btn-primary" id="start_stop" onClick={handleStartStopClick}>
        {startStopButtonLabel}
      </button>
    </div>
        
};

export default TimeLeft;
import React, {useState, useEffect} from "react";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";
import { Modal, Button } from "react-bootstrap";


function App() {
    const [currentSessionType, setCurrentSessionType] = useState("Session");
    const [intervalId, setIntervalId] = useState(null);
    const [sessionLenght, setSessionLenght] = useState(60 * 25);
    const [breakLenght, setBreakLenght] = useState(300);
    const [timeLeft, setTimeLeft] = useState(sessionLenght);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [timerIsActive, setTimerIsActive] = useState(false);

    useEffect (() => {
        setTimeLeft(sessionLenght);
        }, [sessionLenght]);


    const decrementBreakLengthByOneMinute = () => {
        const newBreakLenght = breakLenght -60;
        if(newBreakLenght >= 60) {
            setBreakLenght(newBreakLenght)
        }
    };
    const incrementBreakLengthByOneMinute = () => {
        const newBreakLenght = breakLenght + 60
        if (newBreakLenght <= 60 * 60)
            setBreakLenght (breakLenght + 60);
    };


    const decrementSessionLengthByOneMinute = () => {
        const newSessionLenght = sessionLenght - 60;
        if (newSessionLenght >= 60) {
            setSessionLenght(newSessionLenght);
        }
    };

    const incrementSessionLengthByOneMinute = () => {
        setSessionLenght (sessionLenght +60);
    };

   

    const isStarted = intervalId != null;

    const handleStartStopClick = () => {
        if(isStarted) {
            //stop timer
        clearInterval(intervalId);
        setIntervalId(null);
        setTimerIsActive(false);
        }
        else {
            const newIntervalId = setInterval(() => {
                //start timer
                setTimeLeft(prevTimeLeft => {
                    const newTimeLeft = prevTimeLeft -1;
                    if (newTimeLeft > 0)
                    {
                    return prevTimeLeft -1;
                    } 
                    if (currentSessionType === "Session") {
                        setIntervalId(null);
                        clearInterval(newIntervalId);
                        setTimeLeft(sessionLenght);
                        setModalIsOpen(true);
                    }
                    
                });
                }, 1000)
                setIntervalId(newIntervalId);
                setTimerIsActive(true);
        }
        
    };

    const closeModal =(takeBreak) => {
        setModalIsOpen(false);
        if(takeBreak)
        {
            setCurrentSessionType("Break");
            setTimeLeft(breakLenght);
            handleStartStopClick();
        }
    };

    const handleResetButtonClick =() => {
        clearInterval(intervalId);
        setIntervalId(null);
        setCurrentSessionType('Session');
        setSessionLenght(60 * 25); 
        setBreakLenght(60 * 5);
        setTimeLeft(60 * 25);
    };

    const GetTimerStyle=() => {
        let color = "grey";
        if(timerIsActive)
            color = (currentSessionType === "Break" ? "green" : "red" )

        return {backgroundColor: color};
    }


    return(
        <div className="grid">
            <div className="break">
                <Break 
                breakLenght= {breakLenght}
                decrementBreakLengthByOneMinute = {decrementBreakLengthByOneMinute}
                incrementBreakLengthByOneMinute = {incrementBreakLengthByOneMinute}
                enabledButton = {!timerIsActive}
                />
            </div>
            <div style={GetTimerStyle()} className="App">
            
                <TimeLeft 
                        handleStartStopClick={handleStartStopClick}
                        timerLabel={currentSessionType}
                        startStopButtonLabel={isStarted ? 'Stop' : 'Start'}
                        timeLeft={timeLeft}
                />
                
                
                <button className="btn btn-primary" id="reset" onClick={handleResetButtonClick}> <div>{'Reset'}</div></button>
                <Modal show={modalIsOpen} onHide={() =>closeModal()}>
                    <Modal.Header >
                        <Modal.Title><div>{'Pfiouuu'}</div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body><div>{'It is time to take a break !'}</div></Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() =>closeModal()}>
                        <div>{'Skip break'}</div>
                        </Button>
                        <Button variant="primary" onClick={() =>closeModal(true)}>
                        <div>{'Take a break'}</div>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="session">
                <Session 
                sessionLenght= {sessionLenght}
                decrementSessionLengthByOneMinute = {decrementSessionLengthByOneMinute}
                incrementSessionLengthByOneMinute = {incrementSessionLengthByOneMinute}
                enabledButton = {!timerIsActive}
                />
            </div>
           
        </div>
    );
}

export default App;
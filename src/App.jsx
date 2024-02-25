import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [counter, setCounter] = useState(() => {
    // Initialize the counter with the value stored in localStorage or default to 800
    const storedCounter = localStorage.getItem('counter');
    return storedCounter ? parseInt(storedCounter, 10) : 810;
  });

  useEffect(() => {
    const magicDate = new Date('5 May 2024').getTime();

    const updateTimer = () => {
      const currentTime = new Date().getTime();
      const secondsRemaining = (magicDate - currentTime) / 1000;

      setDays(Math.floor(secondsRemaining / 3600 / 24));
      setHours(Math.floor(secondsRemaining / 3600) % 24);
      setMinutes(Math.floor(secondsRemaining / 60) % 60);
      setSeconds(Math.floor(secondsRemaining) % 60);
    };

    const countdownInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    // Update localStorage whenever the counter changes
    localStorage.setItem('counter', counter.toString());
  }, [counter]);

  const decreaseCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Time Left</h1>
      </div>

      <div className="main-content">
        <div className="timer-container">
          <div className="timer">
            <div className="time">{days < 10 ? `0${days}` : days}</div>
            <div className="label">Days</div>
          </div>
          <div className="timer">
            <div className="time">{hours < 10 ? `0${hours}` : hours}</div>
            <div className="label">Hours</div>
          </div>
          <div className="timer">
            <div className="time">{minutes < 10 ? `0${minutes}` : minutes}</div>
            <div className="label">Mins</div>
          </div>
          <div className="timer">
            <div className="time">{seconds < 10 ? `0${seconds}` : seconds}</div>
            <div className="label">Seconds</div>
          </div>
        </div>

        {/* <div className="counter-container" >
          <h2>Total Left</h2>
          <div className="counter">{counter}</div>
          <button onClick={decreaseCounter} style={{

            marginBottom: "20px",
            marginLeft: "20px",
            fontSize: "25px",
            height: "120px",
            width: "180px"
          }}>Decrease Counter</button>
        </div> */}
      </div>
    </div>
  );
}

export default App;

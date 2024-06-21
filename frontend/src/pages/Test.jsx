import React, { useState, useEffect } from 'react';

const Test = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Increment by 10 milliseconds
      }, 10);
      setTimerInterval(intervalId);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const formatTime = (timeInMilliseconds) => {
    const milliseconds = Math.floor(timeInMilliseconds % 1000);
    const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
    const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((timeInMilliseconds / (1000 * 60 * 60)) % 24);

    const pad = (num) => {
      return num.toString().padStart(2, '0');
    };

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
  };

  return (
    <div className="stopwatch-container text-center"> {/* Apply CSS class for centering */}

        <ul>
           <li><h1>#Task</h1></li>
           <li>Create a TEST route '/test' and make a file</li>
           <li>And, Create a Stopwatch, Like below!</li>
        </ul>

      <h1>Stopwatch</h1>
      <p>{formatTime(time)}</p>
      <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={handleLap} disabled={!isRunning}>Lap</button>
      <button onClick={handleReset}>Reset</button>
      <div>
        <h2>Laps</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Test;

import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ remainingTime, onTimerEnd }) => {
  const [time, setTime] = useState(remainingTime);

  useEffect(() => {
    console.log(remainingTime);
    setTime(remainingTime);
  }, [remainingTime]);

  useEffect(() => {
    if (time === null) return;

    const intervalId = setInterval(() => {
      setTime(prevTime => prevTime - 1);

      if (time === 0) {
        clearInterval(intervalId);
        onTimerEnd();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time, onTimerEnd]);

  if (time === null) {
    return <p>Loading...</p>;
  }

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div>
      <p>Time Remaining: {formattedTime}</p>
    </div>
  );
};

export default CountdownTimer;

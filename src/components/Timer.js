import { useState, useEffect } from 'react';

const Timer = ({ gameWon }) => {
  const [time, setTime] = useState({
    sec: 0,
    min: 0,
    hr: 0,
  });

  const [running, setRunning] = useState(true);

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setTime((prev) => {
          let newTime = { ...prev };
          if (newTime.sec < 59) newTime.sec += 1;
          else {
            newTime.min += 1;
            newTime.sec = 0;
          }
          if (newTime.min === 60) {
            newTime.min = 0;
            newTime.hr += 1;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [running]);

  useEffect(() => {
    if (gameWon) {
      setRunning(false);
    }
  }, [gameWon]);

  return (
    <div className="App">
      <h2>
        {`${time.hr < 10 ? 0 : ''}${time.hr} : ${
          time.min < 10 ? 0 : ''
        }${time.min} : ${time.sec < 10 ? 0 : ''}${time.sec}`}
      </h2>
    </div>
  );
};

export default Timer;

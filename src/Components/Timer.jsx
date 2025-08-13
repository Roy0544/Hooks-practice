import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

export default function App() {
  const [time, setTime] = useState(0); // elapsed time in ms
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); // store setInterval ID

  // Start the timer
  const startTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
    }
  }, [isRunning]);

  // Pause the timer
  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Reset the timer
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTime(0);
  }, []);

  // Effect to handle timer start/pause + cleanup
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10); // increment every 10ms
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    console.log(intervalRef.current);
    

    // Cleanup on unmount
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Format time using useMemo for efficiency
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    const pad = (num, size = 2) => num.toString().padStart(size, "0");
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  }, [time]);

  return (
    <div style={styles.container}>
      <h1>⏱ Simple Stopwatch</h1>
      <div style={styles.timerDisplay}>{formattedTime}</div>
      <div style={styles.buttons}>
        <button onClick={startTimer} style={styles.btn}>Start</button>
        <button onClick={pauseTimer} style={styles.btn}>Pause</button>
        <button onClick={resetTimer} style={styles.btn}>Reset</button>
      </div>
    </div>
  );
}

// Inline styles for quick demo
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "40px"
  },
  timerDisplay: {
    fontSize: "3rem",
    margin: "20px 0",
    fontWeight: "bold"
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  },
  btn: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer"
  }
};

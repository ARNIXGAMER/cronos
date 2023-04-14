import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

export const Crono = ({ id = '123', title = 'Test', project = 'MKR'}) => {
    const [isCounting, setIsCounting] = useState(false);
    const [seconds, setSeconds] = useState(0);

    const formatTime = (s) =>{
        const hours = Math.floor(s / 3600);
        const minutes = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }

  const handleReset = () => {
    setSeconds(0);
    setIsCounting(false);
  };
  useEffect(() => {
    let interval = null;
    if (isCounting) {
      interval = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isCounting]);
  return (
    <Card style={{ width: "18rem" }} id={id}>
      <Card.Title>{formatTime(seconds)}</Card.Title>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{project}</Card.Text>
        <Button variant="primary" onClick={() => setIsCounting(!isCounting)}>
          {isCounting ? "stop" : "go"}
        </Button>
        <Button variant="primary" onClick={() => handleReset()}>
          Reset
        </Button>
      </Card.Body>
    </Card>
  );
};

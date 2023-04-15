import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

export const Crono = ({
  id = "123",
  title = "Default",
  description = "Default",
  handleDelete,
  editMode,
  setEditMode,
  setDescription,
  setTitle
}) => {
  const [isCounting, setIsCounting] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const formatTime = (s) => {
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setSeconds(0);
    setIsCounting(false);
  };
  useEffect(() => {
    let interval = null;
    if (isCounting) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
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
      <div className="card-icons">
        <Button variant="primary" onClick={() => handleDelete(id)}>
          x
        </Button>
        <Button variant="primary" onClick={() => setEditMode(!editMode)}>
        <i className="fa fa-pencil" aria-hidden="true"></i>
        </Button>
      </div>
      <div className="card-timer">
        <Card.Title>{formatTime(seconds)}</Card.Title>
      </div>

      {!editMode ? (
        <Card.Body>
          <div className="card-text">
            <Card.Title>Title : {title}</Card.Title>
            <Card.Text>Description : {description}</Card.Text>
          </div>
          <div className="card-buttons">
            <Button
              variant="primary"
              onClick={() => setIsCounting(!isCounting)}
            >
              {isCounting ? "stop" : "go"}
            </Button>
            <Button variant="primary" onClick={() => handleReset()}>
              Reset
            </Button>
          </div>
        </Card.Body>
      ) : (
        <Card.Body>
          <div className="card-text">
            <form >

            </form>
            <Card.Title>Title : <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          </Card.Title>
            <Card.Text>Description :
          <input
            placeholder="Project"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
          </Card.Text>
          </div>
          <div className="card-buttons">
            <Button variant="primary" onClick={() => setEditMode(!editMode)}>
              X
            </Button>
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

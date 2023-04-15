import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

export const Crono = ({
  id,
  title = "Default",
  description = "Default",
  handleDelete,
  setDescriptionEdit,
  setTitleEdit,
  descriptionEdit,
  titleEdit,
  handleEdit,
}) => {
  const [isCounting, setIsCounting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
    if (isEditing) {
      setTitleEdit(title);
      setDescriptionEdit(description);
    }
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
  }, [isCounting, isEditing]);
  return (
    <Card style={{ width: "18rem" }} key={id}>
      <div className="card-icons">
        <Button variant="primary" onClick={() => handleDelete(id)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </Button>
        <Button variant="primary" onClick={() => setIsEditing(!isEditing)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </Button>
      </div>
      <div className="card-timer">
        <Card.Title>{formatTime(seconds)}</Card.Title>
      </div>

      {!isEditing ? (
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
            <form
              onSubmit={(e) => {
                handleEdit(e, id);
                setIsEditing(!isEditing);
              }}
            >
              <input
                placeholder="Title"
                onChange={(e) => setTitleEdit(e.target.value)}
                value={titleEdit}
                required
              />
              <input
                placeholder="Project"
                onChange={(e) => setDescriptionEdit(e.target.value)}
                value={descriptionEdit}
                required
              />
              <Button variant="primary" type="submit">
                Save
              </Button>
            </form>
          </div>
          <div className="card-buttons">
            <Button variant="primary" onClick={() => setIsEditing(!isEditing)}>
              X
            </Button>
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

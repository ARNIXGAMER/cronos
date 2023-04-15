import { useState } from "react";
import "./App.css";
import { Crono } from "./Components/Crono";
import { Button, Form, InputGroup } from "react-bootstrap";

function App() {
  const [counters, setCounters] = useState([]);
  const [formCreate, setFormCreate] = useState(false);
  const [editMode,setEditMode] = useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    setCounters((prevCounters) => {
      const newCounters = prevCounters.concat({ title, description });
      setTitle("");
      setDescription("");
      setFormCreate(!formCreate);
      return newCounters;
    });
  };
  const handleDelete = (id) =>{
    setCounters(counters.filter((counter,idx) => idx !== id))
  }
  return (
    <div className="container">
      <div className="title-container">
        <h1 className="title">Cronos</h1>
      </div>
      <div className="crono-container">
        {counters.length === 0 ? (
          <h1>No hay cronos</h1>
        ) : (
          counters.map((counter, idx) => {
            return <Crono id={idx} title={counter.title} description={counter.description} handleDelete={handleDelete} editMode={editMode} setEditMode={setEditMode} setTitle={setTitle} setDescription={setDescription} />;
          })
        )}
        <Crono></Crono>
      </div>
      {!formCreate ? (
        ""
      ) : (
        <form onSubmit={(e) => handleCreate(e)}>
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />

          <input
            placeholder="Project"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
          <Button variant="primary" type="submit">
            Crear
          </Button>
        </form>
      )}
      <Button variant="primary" onClick={() => setFormCreate(!formCreate)}>
        {formCreate ? "x" : "+"}
      </Button>
    </div>
  );
}

export default App;

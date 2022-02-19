import React, { useState } from "react";
import "./styles.css";

function Form(props) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDesc] = useState("");

  function handleYearChange(e) {
    e.preventDefault();
    setYear(e.target.value);
  }

  function handleTitleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleDescChange(e) {
    e.preventDefault();
    setDesc(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addTLEvent(year, title, description);
    setTitle("");
    setDesc("");
    setYear("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-title">
        NEW EVENT
      </h2>
      <input
        type="text"
        id="new-event-title"
        className="input"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
      />
      <input
        type="text"
        id="new-event-description"
        className="input"
        autoComplete="off"
        value={description}
        onChange={handleDescChange}
        placeholder="Description"
      />
      <input
        type="text"
        id="new-event-date"
        className="input"
        value={year}
        onChange={handleYearChange}
        placeholder="Year"
      />
      <button type="submit" className="submit-button">
        Add
      </button>
    </form>
  );
}

export default Form;

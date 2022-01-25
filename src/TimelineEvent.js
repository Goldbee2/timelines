import React, { useState } from "react";

function TimelineEvent(props) {
  return (
    <li key={props.id} className="Timeline-Event">
      <button className="event-button" onClick={() => props.deleteEvent(props.id)}>
        <h4>x</h4>
      </button>
      <div className="details">
        <h3>{props.year} {props.title}</h3>
        <p className="description">{props.description}</p>
      </div>
    </li>
  );
}

export default TimelineEvent;

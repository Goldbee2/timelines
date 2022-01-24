import React, { useState } from "react";

function TimelineEvent(key, year, description, deleteEvent, eventList) {
  console.log("id:", key, "eventList:", eventList);

  return (
    <li key={key.toString()} className="Timeline-Event">
      <button className="event-button" onClick={() => deleteEvent(key, eventList)}>
        <h4>x</h4>
      </button>
      <div>
        <h3>{year}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
}

export default TimelineEvent;

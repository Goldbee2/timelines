import React, { useEffect, useState } from "react";
import "./styles.css";
import DatePanel from "./DatePanel.js";
import DisplayPanel from "./DisplayPanel";
import TimelineEvent from "./TimelineEvent";
import Form from "./Form";
import Canvas from "./canvas/Canvas";

function App(props) {
  const [listOfEvents, setTLEvents] = useState(props.timelineEvents);
  const [currID, setID] = useState(0);

  const eventList = listOfEvents
    .sort((a, b) => compareNumbers(a.year, b.year))
    .map((tlEvent) => (
      <TimelineEvent
        id={tlEvent.id}
        key={tlEvent.id}
        year={tlEvent.year}
        description={tlEvent.description}
        title={tlEvent.title}
        deleteEvent={deleteEvent}
      />
    ));

  function compareNumbers(a, b) {
    return a - b;
  }

  function addTLEvent(year, title, description) {
    setID(currID + 1);
    const thisEvent = {
      id: currID.toString(),
      year: year,
      title: title,
      description: description,
    };
    console.log(thisEvent);
    setTLEvents([...listOfEvents, thisEvent]);
  }

  function deleteEvent(id) {
    const remainingEvents = listOfEvents.filter((item) => item.id !== id);
    setTLEvents(remainingEvents);
  }

  return (
    <div className="App">
      <main className="App-main">
        {/* <DatePanel props={timelineEvents}/> */}
        {/* FORM INSTEAD OF DATEPANEL??? */}
        <div id="container-left">
          <h1>Timelines</h1>
          <div id="Date-Panel" className="panel">
            <div id="event-form">
              <Form addTLEvent={addTLEvent} />
            </div>

            <h2>EVENTS</h2>
            <ul id="Event-List">{eventList}</ul>
          </div>
          <button className="submit-button">download</button>
        </div>
        <div id="canvas-container"  className="panel">
          <Canvas
            id="timeline-canvas"
            tlEvents={listOfEvents.sort((a, b) =>
              compareNumbers(a.year, b.year)
            )}
            width={"1920px"}
            height={"1080px"}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

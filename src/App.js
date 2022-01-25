import React, { useEffect, useState } from "react";
import "./styles.css";
import DatePanel from "./DatePanel.js";
import DisplayPanel from "./DisplayPanel";
import TimelineEvent from "./TimelineEvent";
import Form from "./Form";


function App(props) {

  const [listOfEvents, setTLEvents] = useState(props.timelineEvents);
  const [currID, setID] = useState(0);
  
  const eventList = listOfEvents.map(tlEvent=> (
    <TimelineEvent
      id={tlEvent.id}
      key={tlEvent.id}
      year={tlEvent.year}
      description={tlEvent.description}
      title={tlEvent.title}
      deleteEvent={deleteEvent}
      />));


  function addTLEvent(year, title, description) {
    setID(currID + 1);
    const thisEvent = {id:currID.toString(), year:year, title:title, description:description};
    console.log(thisEvent);
    setTLEvents([...listOfEvents, thisEvent]);
  }


  function deleteEvent(id) {
    const remainingEvents = listOfEvents.filter(item => item.id !== id);
    setTLEvents(remainingEvents);
  }


  return (
    <div className="App">
      <header className="App-header">Test for now</header>
      <main className="App-main">
        {/* <DatePanel props={timelineEvents}/> */}
        {/* FORM INSTEAD OF DATEPANEL??? */}
        <div id="Date-Panel">
          <div id="event-form">
            <Form addTLevent = {addTLEvent}/>
            <button
              onClick={() => [
                addTLEvent(
                  currID, "TITLE",
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                ),
              ]}
            >
              BUTTON
            </button>
          </div>

          <h1>Events</h1>
          <ul id="Event-List">{eventList}</ul>
        </div>
      </main>
      <footer className="App-footer">By Eli Goldberg</footer>
    </div>
  );
}

export default App;

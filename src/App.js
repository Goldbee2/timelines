import React, { useEffect, useState } from "react";
import "./styles.css";
import DatePanel from "./DatePanel.js";
import DisplayPanel from "./DisplayPanel";
import TimelineEvent from "./TimelineEvent";

function App(props) {
  const [listOfEvents, setTLEvents] = useState([]);
  const [id, setID] = useState(0);
  

  function addTLEvent(year, description) {
    setID(id + 1);
    let thisEvent = new TimelineEvent(
      id,
      year,
      description,
      deleteEvent,
      listOfEvents
    );
    setTLEvents([...listOfEvents, thisEvent]);
  }

  function deleteEvent(key) {
    console.log("key:", key, "eventlist", listOfEvents);
    console.log("length before filter:", listOfEvents.length);
    const remainingEvents = listOfEvents.filter(item => item.key !== key);
    console.log("deleted object with id", key);
    console.log("length after filter:", remainingEvents.length);
    setTLEvents(remainingEvents);
    console.log("length of final list after change:", listOfEvents.length);
    console.log(listOfEvents);
  }

  return (
    <div className="App">
      <header className="App-header">Test for now</header>
      <main className="App-main">
        {/* <DatePanel props={timelineEvents}/> */}
        {/* FORM INSTEAD OF DATEPANEL??? */}
        <div id="Date-Panel">
          <div id="event-form">
            <form>
              <input type="text" name="year" placeholder="Year" />
              <input type="text" name="title" placeholder="Title" />
              <input
                type="text"
                name="description"
                id="description-input"
                placeholder="Description"
              />
            </form>
            <button
              onClick={() => [
                addTLEvent(
                  id,
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                ),
              ]}
            >
              BUTTON
            </button>
          </div>

          <h1>Events</h1>
          <ul id="Event-List">{listOfEvents}</ul>
        </div>
      </main>
      <footer className="App-footer">By Eli Goldberg</footer>
    </div>
  );
}

export default App;

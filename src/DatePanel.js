import React , {useState} from "react";

function DatePanel(props){

    const timelineEvents = Array.from(props);

    return(
        <div>
            <span>TEST</span>
            {/* // <Form/> */}
            <div className="eventList">

            </div>
            {/* // map prop details to DOM element */}
            {timelineEvents}
        </div>
    );
}

export default DatePanel;
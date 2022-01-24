import React, {useState} from "react";
import './styles.css';

function Form(props){
    
    const [name, setName] = useState("");

    function handleChange(e){
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!name.trim()){
            return;
        }
        props.addEvent(name);
        setName("");
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2 className="form-title">
                <label htmlFor="new-label-input" className="label">
                    New event
                </label>
            </h2>
            <input
                type="text"
                id="new-event-description"
                className = "input"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <input
                type="date"
                id="new-event-date"
                className="input"
                name="date"
            />
            <button type="submit" className="button">
                Add
            </button>
        </form>
    );
}

export default Form;
import "./App.css";

import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [element, setElement] = useState("default");


  const handleSubmit = (e) => {
    console.log("Submitting...");
    e.preventDefault();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const handleElementChange = (e) => {
    setElement(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="text-gray-900 container mt-8">
      <header>
        <h1 className="h1">Pokemon Quiz:</h1>
      </header>
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className="label">
            Name:
            <input
              type="text"
              name="name"
              className="input"
              onChange={(e) => handleNameChange(e)}
              placeholder="Fill your name"
            />
          </label>
          <label className="label">
            What's your favorite element?
            <select
              name="pokemon"
              className="input"
              defaultValue={element}
              onChange={(e) => handleElementChange(e)}
            >
              <option value="default" disabled hidden>
                Choose your element
              </option>
              <option value="water">Water</option>
              <option value="air">Air</option>
              <option value="fire">Fire</option>
              <option value="earth">Earth</option>
              <option value="metal">Metal</option>
            </select>
          </label>
          <input type="submit" value="Submit" className="btn-primary" />
        </form>
      </div>
    </div>
  );
}

export default App;

import "./App.css";

import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [element, setElement] = useState("placeholderElementMessage");
  const [color, setColor] = useState("placeholderColorMessage");
  const [errors, setErrors] = useState({
    nameInput: null,
    elementSelect: null,
    colorSelect: null,
  });

  const unsetError = (key) => {
    setErrors((errors) => {
      return {
        ...errors,
        [key]: null,
      };
    });
  };

  const setError = (key, message) => {
    setErrors((errors) => {
      return {
        ...errors,
        [key]: message,
      };
    });
  };

  const endpoint = "https://enz3kaqoiji4.x.pipedream.net/";

  const handleNameValidate = () => {
    if (name.length < 2 || name.length > 30) {
      setError("nameInput", "Name should be between 2 and 30 characters");
    } else {
      unsetError("nameInput");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleNameValidate();

    if (element === "placeholderElementMessage") {
      setError("elementSelect", "Favorite element is required");
    }

    if (color === "placeholderColorMessage") {
      setError("colorSelect", "Favorite color is required");
    }

    if (
      errors.nameInput ||
      element === "placeholderElementMessage" ||
      color === "placeholderColorMessage"
    ) {
      return;
    }

    await fetch(endpoint, {
      method: "post",
      mode: "no-cors",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, element, color }),
    })
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleElementChange = (e) => {
    unsetError("placeholderElementMessage");
    setElement(e.target.value);
  };

  const handleColorChange = (e) => {
    unsetError("placeholderColorMessage");
    setColor(e.target.value);
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
              className={`input ${errors.nameInput && "input-error"}`}
              data-testid="name-input"
              onChange={(e) => handleNameChange(e)}
              onBlur={() => handleNameValidate()}
              placeholder="Fill in your name"
            />
          </label>
          {errors?.nameInput && (
            <span className="error">{errors.nameInput}</span>
          )}
          <label className="label">
            What's your favorite element?
            <select
              name="pokemon"
              className={`input ${errors.elementSelect && "input-error"}`}
              data-testid="element-selector"
              defaultValue={element}
              onChange={(e) => handleElementChange(e)}
            >
              <option value="placeholderElementMessage" disabled hidden>
                Choose your element
              </option>
              <option value="water">Water</option>
              <option value="air">Air</option>
              <option value="fire">Fire</option>
              <option value="earth">Earth</option>
              <option value="metal">Metal</option>
            </select>
          </label>
          {errors?.elementSelect && (
            <span className="error">{errors.elementSelect}</span>
          )}

          <label className="label">
            What's your favorite color?
            <select
              name="pokemon"
              className={`input ${errors.elementSelect && "input-error"}`}
              data-testid="color-selector"
              defaultValue={color}
              onChange={(e) => handleColorChange(e)}
            >
              <option value="placeholderColorMessage" disabled hidden>
                Choose your color
              </option>
              <option value="black">Black</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="orange">Orange</option>
              <option value="red">Red</option>
              <option value="purple">Purple</option>
              <option value="white">White</option>
              <option value="yellow">Yellow</option>
            </select>
          </label>
          {errors?.colorSelect && (
            <span className="error">{errors.colorSelect}</span>
          )}

          <input
            type="submit"
            data-testid="primary-button"
            value="Submit"
            className="btn-primary"
          />
        </form>
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import React from "react";
import PokemonForm from "./PokemonForm";

function refreshPage() {
  window.location.reload(false);
}

function App() {
  const endpoint = "http://localhost:3004/responses";

  const handleSubmit = async (values) => {
    if (values.name && values.element && values.color) {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => console.log(res))
        .catch((error) => {
          console.error("Error:", error);
        });

      refreshPage()
    }
  };

  return (
    <div className="text-gray-900 container mt-8">
      <header>
        <h1 className="h1" data-testid="heading">
          Pokemon Quiz:
        </h1>
      </header>
      <div className="container">
        <PokemonForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default App;

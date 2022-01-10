import "./App.css";
import React from "react";
import PokemonForm from "./PokemonForm";

function App() {
  const endpoint = "https://enz3kaqoiji4.x.pipedream.net/";

  const handleSubmit = async (values) => {
    if (values.name && values.element && values.color) {
      await fetch(endpoint, {
        method: "post",
        mode: "no-cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      })
        .then((res) => console.log(res))
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="text-gray-900 container mt-8">
      <header>
        <h1 className="h1" data-testid="heading">Pokemon Quiz:</h1>
      </header>
      <div className="container">
        <PokemonForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default App;

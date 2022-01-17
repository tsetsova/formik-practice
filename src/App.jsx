import "./App.css";
import PokemonForm from "./components/PokemonForm";

function App() {
  const endpoint = "http://localhost:3004/responses";

  const handleSubmit = async (values, { setStatus, resetForm }) => {
    if (values.name && values.element && values.color) {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            resetForm();
            setStatus({
              message: "Form succesfully submitted!",
              ok: true,
            });
          } else {
            setStatus({
              message: `Form failed to submit:${response.statusText}`,
              ok: false,
            });
          }
        })
        .catch((error) => {
          setStatus({
            message: `Form failed to submit:${error}`,
            ok: false,
          });
        });
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

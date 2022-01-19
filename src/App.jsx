import { useEffect, useState } from "react";
import "./App.css";
import PokemonForm from "./components/PokemonForm";
import { ImSpinner } from "react-icons/im";
import PokemonAnswer from "./components/PokemonAnswer";

function App() {
  const [loading, setLoading] = useState(true);
  const [responded, setResponded] = useState(false);
  const [response, setResponse] = useState({});
  const [rules, setRules] = useState({});

  const endpoint = "http://localhost:3004/responses";

  useEffect(() => {
    setLoading(false);
    setRules(require("./utilities/pokemon_assignment_rules.json"));
  }, []);

  const handleSubmit = async (
    values,
    { setStatus, resetForm, setSubmitting }
  ) => {
    if (values.name && values.preferences.color && values.preferences.element) {
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
            setSubmitting(false);
            setResponse({
              name: values.name,
              color: values.preferences.color,
              element: values.preferences.element,
            });
            setResponded(true);
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
    <div className="container">
      <h1 className="h1" data-testid="heading">
        Pokemon Quiz:
      </h1>

      <div className="w-72 mx-auto mt-6">
        {loading ? (
          <span className="absolute top-1/2 left-1/2">
            <ImSpinner size={32} />
          </span>
        ) : !responded ? (
          <PokemonForm onSubmit={handleSubmit} />
        ) : (
          <PokemonAnswer response={response} rules={rules}/>
        )}
      </div>
    </div>
  );
}

export default App;

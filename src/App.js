import "./App.css";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
        <h1 className="h1">Pokemon Quiz:</h1>
      </header>
      <div className="container">
        <Formik
          initialValues={{
            name: "",
            color: "",
            element: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .matches(
                /^[aA-zZ\s]+$/,
                "Only letters allowed "
              )
              .min(2, "Must be 2 characters or less")
              .max(30, "Must be 30 characters or less")
              .required("Required"),
            element: Yup.string().required("Favorite element is required"),
            color: Yup.string().required("Favorite color is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form>
              <label htmlFor="name">What's your name?</label>
              <Field
                type="text"
                name="name"
                className="input"
                data-testid="name-input"
              ></Field>
              <ErrorMessage
                name="name"
                component="div"
                className="error"
                data-testid="name-error"
              />

              <label htmlFor="color">What's your favorite color?</label>
              <Field
                as="select"
                name="color"
                className="input"
                data-testid="color-selector"
              >
                <option value="" label="Choose your color" />
                <option value="black">Black</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="orange">Orange</option>
                <option value="red">Red</option>
                <option value="purple">Purple</option>
                <option value="white">White</option>
                <option value="yellow">Yellow</option>
              </Field>
              <ErrorMessage
                name="color"
                component="div"
                className="error"
                data-testid="color-error"
              />

              <label htmlFor="element">What's your favorite element?</label>
              <Field
                as="select"
                name="element"
                className="input"
                data-testid="element-selector"
              >
                <option value="" label="Choose your element" />
                <option value="water">Water</option>
                <option value="air">Air</option>
                <option value="fire">Fire</option>
                <option value="earth">Earth</option>
                <option value="metal">Metal</option>
              </Field>
              <ErrorMessage
                name="element"
                component="div"
                className="error"
                data-testid="element-error"
              />
              <button
                type="submit"
                className="btn-primary"
                data-testid="primary-button"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;

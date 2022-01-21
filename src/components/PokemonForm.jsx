import { Formik, Form, Field, ErrorMessage } from "formik";
import { ImSpinner } from "react-icons/im";
import * as Yup from "yup";
import FlashMessage from "./FlashMessage";

function PokemonForm({ onSubmit, userName }) {
  return (
    <Formik
      initialValues={{
        name: userName,
        preferences: {
          element: "",
          color: "",
        },
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .matches(/^[aA-zZ\s]+$/, "Only letters allowed ")
          .min(2, "Must be 2 characters or less")
          .max(30, "Must be 30 characters or less")
          .required("Required"),
          preferences: Yup.object({
          color: Yup.string().required("Required"),
          element: Yup.string().required("Required"),
        }),
      })}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnChange={false}
    >
      {({ status, isSubmitting }) => (
        <Form>
          {status?.message && (
            <FlashMessage
              duration={3000}
              message={status.message}
              severity={status.ok ? "info" : "error"}
            />
          )}
          <div className="form-control">
            <label htmlFor="name">What's your name?</label>
            <Field
              type="text"
              name="name"
              className="input"
              data-testid="name-input"
              placeholder="Fill in your name"
            ></Field>
            <ErrorMessage
              name="name"
              component="div"
              className="error"
              data-testid="name-error"
            />
          </div>
          <div className="form-control">
            <label htmlFor="color">What's your favorite color?</label>
            <Field
              as="select"
              name="preferences.color"
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
              name="preferences.color"
              component="div"
              className="error"
              data-testid="color-error"
            />
          </div>
          <div className="form-control">
            <label htmlFor="element">What's your favorite element?</label>
            <Field
              as="select"
              name="preferences.element"
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
              name="preferences.element"
              component="div"
              className="error"
              data-testid="element-error"
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            data-testid="primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? <ImSpinner /> : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default PokemonForm;
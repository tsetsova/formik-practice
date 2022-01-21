import { Formik, Form, Field, ErrorMessage } from "formik";
import { ImSpinner } from "react-icons/im";
import * as Yup from "yup";
import FlashMessage from "./FlashMessage";
import Input from "./Input";

function PokemonForm({ onSubmit, userName = "" }) {
  return (
    <Formik
      initialValues={{
        name: userName,
        element: "",
        color: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .matches(/^[aA-zZ\s]+$/, "Only letters allowed ")
          .min(2, "Must be 2 characters or less")
          .max(30, "Must be 30 characters or less")
          .required("Required"),

        color: Yup.string().required("Required"),
        element: Yup.string().required("Required"),
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
          <Input
            type="text"
            label="What's your name?"
            name="name"
            placeholder={"Fill in your name"}
          />
          <Input
            type="select"
            label="What's your favorite color?"
            name="color"
            placeholder={"Choose color"}
            options={[
              "Black",
              "Blue",
              "Green",
              "Orange",
              "Red",
              "Puprle",
              "White",
              "Yellow",
            ]}
          />
          <Input
            type="select"
            label="What's your favorite element?"
            name="element"
            placeholder={"Choose element"}
            options={["Water", "Air", "Fire", "Earth", "Metal"]}
          />

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

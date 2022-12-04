import { useFormik } from "formik";

export default function useInput(inputs, validationSchema, onSubmit) {
  const inputValues = inputs
    .map((input) => {
      return input["name"];
    })
    .map((value) => {
      return { [value]: "" };
    });

  const formik = useFormik({
    initialValues: Object.assign({}, ...inputValues),
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  const validatedInputs = inputs.map((input) => {
    return {
      ...input,
      error: formik.errors[input.name],
      value: formik.values[input.name],
      touched: formik.touched[input.name],
    };
  });

  return { formik, validatedInputs };
}

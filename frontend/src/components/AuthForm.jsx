import { Formik, Field, Form } from "formik";
import StyledErrorMessage from "./StyledErrorMessage";
import * as Yup from "yup";

const AuthForm = ({ isLogin }) => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const AuthFormSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username is too short")
      .max(10, "Username is too Long")
      .required("Username is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please Enter Valid Email")
      .required("Email is required"),
    password: Yup.string()
      .min(4, "Passsword is too short")
      .required("Password is Required"),
  });

  const submitHandler = (values) => {};
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={AuthFormSchema}
    >
      {() => (
        <Form className="w-1/2 mx-auto">
          <h1 className="text-center font-bold text-4xl my-4 text-teal-700">
            {isLogin ? "Login" : "Register"}
          </h1>
          <div className="mb-3">
            <label htmlFor="username" className=" font-medium block">
              Username
            </label>
            <Field
              type="text"
              name="username"
              id="username"
              className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <StyledErrorMessage name="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className=" font-medium block">
              Email
            </label>
            <Field
              type="text"
              name="email"
              id="email"
              className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <StyledErrorMessage name="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className=" font-medium block">
              Password
            </label>
            <Field
              type="text"
              name="password"
              id="password"
              className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <StyledErrorMessage name="password" />
          </div>
          <button
            className=" text-white bg-teal-600 py-3 font-medium w-full text-center mt-2"
            type="submit"
          >
            {isLogin ? "Login" : " Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default AuthForm;

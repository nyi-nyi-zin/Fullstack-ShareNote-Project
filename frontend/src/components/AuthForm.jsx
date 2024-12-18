import { Formik, Field, Form } from "formik";
import StyledErrorMessage from "./StyledErrorMessage";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../contexts/UserContext";

const AuthForm = ({ isLogin }) => {
  const { setToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const AuthFormSchema = Yup.object({
    username: isLogin
      ? null
      : Yup.string()
          .min(3, "Username is too short")
          .max(10, "Username is too Long")
          .required("Username is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please Enter Valid Email"),
    password: Yup.string()
      .min(4, "Passsword is too short")
      .required("Password is Required"),
  });

  const submitHandler = async (values) => {
    const { username, password, email } = values;
    let END_POINT = `${import.meta.env.VITE_URL}/register`;
    if (isLogin) {
      END_POINT = `${import.meta.env.VITE_URL}/login`;
    }
    const response = await fetch(END_POINT, {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const toastFire = (message) => {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    };
    const responseData = await response.json();

    if (response.status === 201) {
      setRedirect(true);
    } else if (response.status === 200) {
      setToken(responseData);
      setRedirect(true);
    } else if (response.status === 400) {
      const pickedMessage = responseData.errorMessages[0].msg;
      toastFire(pickedMessage);
    } else if (response.status === 401) {
      toastFire(responseData.message);
    }
  };

  if (redirect) {
    return <Navigate to={isLogin ? "/" : "/login"} />;
  }

  return (
    <>
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
            {isLogin ? (
              <></>
            ) : (
              <>
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
              </>
            )}
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
                type="password"
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};
export default AuthForm;

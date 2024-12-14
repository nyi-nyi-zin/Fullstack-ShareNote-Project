import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import StyledErrorMessage from "./StyledErrorMessage";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteForm = ({ isCreate }) => {
  const { id } = useParams();

  const [oldFormData, setOldFormData] = useState({
    title: "",
    content: "",
  });

  const [redirect, setRedirect] = useState(false);

  const initialValues = {
    title: isCreate ? "" : oldFormData.title,
    content: isCreate ? "" : oldFormData.content,
  };

  const fetchOldData = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/edit/${id}`);
    const data = await response.json();
    setOldFormData(data);
  };

  useEffect(() => {
    if (!isCreate) {
      fetchOldData();
    }
  }, []);

  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is so short")
      .max(30, "Title is too long")
      .required("Title is required"),
    content: Yup.string()
      .min(3, "Content is Too short")
      .required("Content is required"),
  });

  const submitHandler = async (values) => {
    const url = isCreate
      ? `${import.meta.env.VITE_URL}/create`
      : `${import.meta.env.VITE_URL}/update/${id}`;
    const method = isCreate ? "POST" : "PATCH";
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status === 201 || response.status === 200) {
      setRedirect(true);
    } else {
      toast.error("Something went wrong", {
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
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section>
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create a new note." : "Edit your note."}
        </h1>
        <Link to={"/"}>
          <ArrowLeftIcon width={22} />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={submitHandler}
        enableReinitialize={true}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="title" className=" font-medium block">
              Note title
            </label>

            <Field
              type="text"
              name="title"
              id="title"
              className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <StyledErrorMessage name="title" />
          </div>
          <div className="">
            <label htmlFor="content" className=" font-medium block">
              Note content
            </label>
            <Field
              as="textarea"
              rows={4}
              type="text"
              name="content"
              id="content"
              className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <StyledErrorMessage name="content" />
          </div>
          <button
            className=" text-white bg-teal-600 py-3 font-medium w-full text-center"
            type="submit"
          >
            {isCreate ? "Save" : " Update"}
          </button>
        </Form>
      </Formik>
    </section>
  );
};
export default NoteForm;

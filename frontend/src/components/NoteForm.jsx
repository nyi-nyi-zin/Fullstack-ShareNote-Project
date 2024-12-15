import { ArrowLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import StyledErrorMessage from "./StyledErrorMessage";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteForm = ({ isCreate }) => {
  const { id } = useParams();

  const [oldFormData, setOldFormData] = useState({
    title: "",
    content: "",
  });
  const [redirect, setRedirect] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const fileRef = useRef();

  const initialValues = {
    title: isCreate ? "" : oldFormData.title,
    content: isCreate ? "" : oldFormData.content,
    note_id: isCreate ? "" : oldFormData._id,
    cover_image: isCreate ? null : oldFormData.cover_image,
  };

  const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];

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
    cover_image: Yup.mixed()
      .nullable()
      .test(
        "FILE_FORMAT",
        "File type is not support",
        (value) => !value || SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setPreviewImg(URL.createObjectURL(selectedImage));
      setFieldValue("cover_image", selectedImage);
    }
  };

  const clearPreviewImage = (setFieldValue) => {
    setPreviewImg(null);
    setFieldValue("cover_image", null);
    if (isCreate) {
      fileRef.current.value = "";
    }
  };

  const submitHandler = async (values) => {
    const url = isCreate
      ? `${import.meta.env.VITE_URL}/create`
      : `${import.meta.env.VITE_URL}/update/${id}`;
    const method = isCreate ? "POST" : "PATCH";

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("cover_image", values.cover_image);
    formData.append("note_id", values.note_id);

    const response = await fetch(url, {
      method,

      body: formData,
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
        {({ setFieldValue }) => (
          <Form encType="multipart/form-data">
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
            <div>
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

            <div className="flex justify-between">
              <label htmlFor="cover_image" className="font-medium">
                Cover Image <span>(optional)</span>
              </label>
              {previewImg && (
                <p
                  className="cursor-pointer font-medium"
                  onClick={() => {
                    clearPreviewImage(setFieldValue);
                  }}
                >
                  Clear
                </p>
              )}
            </div>
            <input
              type="file"
              name="cover_image"
              hidden
              ref={fileRef}
              onChange={(e) => {
                handleImageChange(e, setFieldValue);
              }}
            />
            {!isUpload ? (
              <>
                <p
                  onClick={() => {
                    setIsUpload(true);
                  }}
                  className="cursor-pointer  text-teal-600"
                >
                  Upload Cover Image
                </p>
              </>
            ) : (
              <>
                <p
                  className="cursor-pointer text-red-600"
                  onClick={() => {
                    setIsUpload(false);
                  }}
                >
                  Disable Cover Image
                </p>
                <div
                  className="border border-teal-600 flex items-center justify-center text-teal-600 mb-3 h-60 cursor-pointer rounded-lg relative overflow-hidden "
                  onClick={() => {
                    fileRef.current.click();
                  }}
                >
                  <ArrowUpTrayIcon
                    width={30}
                    height={30}
                    className="z-20 text-yellow-400"
                  />
                  {isCreate ? (
                    <>
                      {previewImg && (
                        <img
                          src={previewImg}
                          alt="preview"
                          className=" absolute top-0 left-0   opacity-90 z-1000 h-full w-full p-2 rounded-lg"
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <div>
                        <img
                          src={
                            previewImg
                              ? previewImg
                              : `${import.meta.env.VITE_URL}/${
                                  oldFormData.cover_image
                                }`
                          }
                          alt="preview"
                          className=" absolute top-0 left-0   opacity-90 z-1000 h-full w-full p-2 rounded-lg"
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            <StyledErrorMessage name="cover_image" />
            <button
              className=" text-white bg-teal-600 py-3 font-medium w-full text-center mt-2"
              type="submit"
            >
              {isCreate ? "Save" : " Update"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};
export default NoteForm;

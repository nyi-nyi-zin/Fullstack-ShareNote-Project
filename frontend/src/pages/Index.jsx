import Note from "../components/Note";
import Plus from "../components/Plus";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/notes`);
    const data = await response.json();
    setNotes(data.notes);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const customAlert = (message, status) => {
    if (status === "success") {
      toast.success(message, {
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
    } else if (status === "error") {
      toast.error("Something went wrong!", {
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
  return (
    <section className="flex gap-6 px-10 mt-10 flex-wrap">
      {!loading ? (
        <>
          {notes.map((note) => (
            <Note
              key={note._id}
              note={note}
              fetchNotes={fetchNotes}
              customAlert={customAlert}
            />
          ))}
          <Plus />
        </>
      ) : (
        <>
          <h1>Loading.....</h1>
        </>
      )}
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
    </section>
  );
};

export default Index;

import Note from "../components/Note";

import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import isLogin from "../utils/isLogin";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotes = async (pageNum) => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_URL}/notes?page=${pageNum}`
    );
    const { notes, totalPages } = await response.json();
    setTotalPages(totalPages);
    setNotes(notes);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes(currentPage);
  }, [currentPage]);

  const handlePre = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
    <>
      <section className="flex gap-6 px-10 mt-10 flex-wrap justify-center items-center">
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
          </>
        ) : (
          <>
            <h1>Loading.....</h1>
          </>
        )}
        {!loading && !notes.length && <>No Notes Found</>}
      </section>

      <div className="flex justify-center items-center gap-4 mt-4">
        {currentPage > 1 && (
          <button
            type="button"
            className="text-white font-medium bg-teal-700 px-3 py-1"
            onClick={handlePre}
          >
            Prev Page
          </button>
        )}
        {currentPage < totalPages && (
          <button
            type="button"
            className="text-white font-medium bg-teal-700 px-3 py-1"
            onClick={handleNext}
          >
            Next Page
          </button>
        )}
      </div>

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
export default Index;

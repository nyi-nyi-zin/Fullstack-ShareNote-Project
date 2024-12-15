import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserIcon, ClockIcon } from "@heroicons/react/24/solid";

const Details = () => {
  const { id } = useParams();

  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNote = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/note/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch note");
    }
    const data = await response.json();

    setNote(data.note);
    setLoading(false);
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <section className="px-10 mt-10">
          <div className="text-right">
            <Link
              to={"/"}
              className=" text-teal-600 font-medium border border-teal-600 px-3 py-2"
            >
              Back
            </Link>
          </div>
          {note.cover_image && (
            <img
              src={`${import.meta.env.VITE_URL}/${note.cover_image}`}
              alt={note.title}
              className="my-10 w-full object-cover "
            />
          )}
          <div className="border-t-4 border-t-teal-600 shadow-lg p-3 mt-4">
            <h3 className="text-3xl font-medium">{note.title}</h3>
            <p className="text-base mt-2 flex items-center">
              <UserIcon className="h-7" />
              {note.author}
            </p>
            <p className="text-base mt-2 flex items-center">
              <ClockIcon className="h-7" />
              {note.createdAt}
            </p>
            <p className="text-base mt-2">{note.content}</p>
          </div>
        </section>
      )}
    </>
  );
};

export default Details;

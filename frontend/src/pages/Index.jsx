import Note from "../components/Note";
import Plus from "../components/Plus";
import { useEffect, useState } from "react";

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

  return (
    <section className="flex gap-6 px-10 mt-10 flex-wrap">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
          <Plus />
        </>
      ) : (
        <>
          <h1>Loading.....</h1>
        </>
      )}
    </section>
  );
};

export default Index;

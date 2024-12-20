import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Note = ({ note, fetchNotes, customAlert }) => {
  const { token } = useContext(UserContext);
  const deleteNote = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/delete/${note._id}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    if (response.status === 204) {
      customAlert("Note Deleted!", "success");
      fetchNotes();
    }
  };

  return (
    <div className=" w-2/5 border-t-4 border-t-teal-600 shadow-lg p-3">
      <h3 className="text-xl font-medium">{note.title}</h3>
      <p className="text-sm">{note.content.slice(0, 50)}</p>
      <div className="flex items-center justify-between mt-2 border-t pt-2">
        <p>
          {formatISO9075(new Date(note.createdAt), { representation: "date" })}
        </p>
        <div className="flex items-center justify-end gap-2">
          {token && (
            <>
              {note.author.toString() === token.userId && (
                <>
                  <TrashIcon
                    width={20}
                    className=" text-red-600 cursor-pointer"
                    onClick={deleteNote}
                  />
                  <Link to={"/edit/" + note._id}>
                    <PencilSquareIcon width={20} className="text-teal-600" />
                  </Link>
                </>
              )}
            </>
          )}
          <Link to={`/note/${note._id}`}>
            <EyeIcon width={20} className=" text-gray-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;

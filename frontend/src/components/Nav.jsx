import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Nav = () => {
  const { token, updateToken } = useContext(UserContext);

  const logoutHandler = () => {
    updateToken(null);
  };

  return (
    <nav className="bg-slate-50 py-4 px-10 flex items-center justify-between">
      <Link to={"/"} className=" text-teal-600 font-bold text-4xl">
        SHARENOTE.io
      </Link>
      <div className="flex items-center justify-center gap-2">
        {token ? (
          <>
            <Link
              className=" text-teal-600 font-bold font-mono text-2xl"
              to={"/create"}
            >
              CreateNote
            </Link>
            <Link
              className=" text-teal-600 font-bold font-mono text-2xl"
              to={"/"}
              onClick={logoutHandler}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              className=" text-teal-600 font-bold font-mono text-2xl"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className=" text-teal-600 font-bold font-mono text-2xl"
              to={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-slate-50 py-4 px-10 flex items-center justify-between">
      <Link to={"/"} className=" text-teal-600 font-bold text-4xl">
        SHARENOTE.io
      </Link>
      <div className="flex items-center justify-center gap-2">
        <Link
          className=" text-teal-600 font-bold font-mono text-2xl"
          to={"/create"}
        >
          CreateNote
        </Link>
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
      </div>
    </nav>
  );
};

export default Nav;

import { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { FaCircleUser } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import { logOut } from "../../services/app/slices/auth.slice";

const Header = () => {
  const [open, setOpen] = useState(false);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  let Links = [
    { name: "Home", link: "/" },
    { name: "Course", link: "/courses" },
    { name: "Community", link: "/community" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <nav className="w-full shadow-md sticky top-0 bg-white z-[999]">
      <div className="md:m-auto md:flex md:justify-between md:items-center py-6 px-[23px] lg-[43px]">
        <div>
          <Link to={"/"}>
            <span className="text-3xl font-bold font-prozaLibre tracking-tight text-primary_color_1">
              LearnSphere<span className=" text-yellow_1">.</span>
            </span>
          </Link>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="lg:hidden absolute right-8 top-7 cursor-pointer"
        >
          {!open ? (
            <RxHamburgerMenu className="text-3xl text-gray-700" />
          ) : (
            <RxCross1 className="text-3xl text-gray-700" />
          )}
        </div>

        <div>
          <ul
            className={`px-[23px]  pt-4 pb-36 absolute w-full bg-white  left-0 lg:static lg:w-auto lg:flex lg:justify-center lg:items-center lg:p-0 transition-all duration-700 ease-in-out ${
              open ? "top-20" : "top-[-490px]"
            }`}
          >
            {Links.map((link, index) => {
              return (
                <li
                  key={index}
                  className="py-2 mb-2 lg:ml-0 lg:mr-9 lg:mb-0 relative  w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary_color_1 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                >
                  <Link
                    className="font-poppins font-medium tracking-wide"
                    to={link.link}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            <div className="md:mt-0 pt-[15px] lg:pt-0">
              {isAuthenticated ? (
                <div className=" flex justify-start lg:justify-center items-center gap-3">
                  <Link
                    to="/user/dashboard"
                    className="text-primary_color_1 text-3xl hover:text-yellow_1 transition-all ease-in-out duration-200"
                  >
                    <FaCircleUser />
                  </Link>
                  <button
                    onClick={logOutHandler}
                    className="bg-primary_color_1 px-5 py-2 rounded-md text-md font-semibold font-poppins text-primary_white_1 hover:bg-yellow_1 transition-all ease-in-out duration-200 hover:text-black"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <Link
                  to={"/login"}
                  className="font-poppins font-bold tracking-wide px-2 py-2 rounded-md bg-primary_color_1 transition ease-in-out duration-400 text-primary_white_1 hover:bg-yellow_1 hover:text-gray-800"
                >
                  Get Started
                </Link>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

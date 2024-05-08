import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiErrorWarningFill } from "react-icons/ri";
import { signUp } from "../../../services/app/actions/auth.action";
import AnimatedLoader from "../../utils/AnimatedLoader";
import { useAppDispatch, useAppSelector } from "../../../hooks";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(signUp({ fullname, email, username, role, password })).then(
      (data) => {
        const res = data.payload;
        if (res) {
          navigate("/login");
        } else {
          setErrorMessage(res);
          setFullName("");
          setUsername("");
          setPassword("");
          setEmail("");
        }
      }
    );
  };

  return (
    <section className="font-poppins tracking-wide mt-[20px] box-border ">
      <div className="flex justify-center items-center p-10">
        <div className="w-[430px] h-[730px] px-4 pt-[50px]   border-primary_color_1 border-opacity-35 border-y-[5px]">
          <h2 className="text-3xl text-center font-bold font-prozaLibre tracking-tight text-primary_color_1 mb-8">
            LearnSphere<span className=" text-yellow_1">.</span>
          </h2>

          <form onSubmit={submitHandler} className="flex flex-col">
            <input
              className="border-2 border-gray-500 px-3 py-3 mb-8 text-sm placeholder:font-semibold  placeholder:text-neutral-500 outline-none"
              placeholder="Name"
              type="text"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />

            {errorMessage ? (
              <p className="text-xs text-red-700 flex items-center gap-2 ">
                <span>
                  <RiErrorWarningFill />
                </span>
                {errorMessage}
              </p>
            ) : null}

            <input
              className="border-2 border-gray-500 px-3 py-3 mb-8 text-sm placeholder:font-semibold  placeholder:text-neutral-500 outline-none"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="border-2 border-gray-500 px-3 py-3 mb-8 text-sm placeholder:font-semibold  placeholder:text-neutral-500 outline-none"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border-2 border-gray-500 px-3 py-3 text-sm placeholder:font-semibold placeholder:text-neutral-500 outline-none mb-8"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="border-2 border-gray-500 px-3 py-3 text-sm placeholder:font-semibold placeholder:text-neutral-500 outline-none"
              placeholder="Confirm Password"
              type={showPassword ? "text" : "password"}
            />
            <p
              className=" cursor-pointer text-right mb-5 text-sm font-semibold py-[0.5px] text-primary_color_2 hover:text-yellow_1"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              Show Password
            </p>
            <div className="flex items-center justify-between tracking-wide font-semibold bg-slate-100 px-2 py-3 mb-5">
              <p>Register as </p>
              <div className="mb-1 ">
                <input
                  className="mr-1"
                  type="radio"
                  id="user"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label className="mr-6" htmlFor="user">
                  User
                </label>

                <input
                  className="mr-1"
                  type="radio"
                  id="instructor"
                  name="role"
                  value="instructor"
                  checked={role === "instructor"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="instructor">Instructor</label>
              </div>
            </div>
            <button
              disabled={!(fullname && username && password).trim()}
              className="px-3 py-3 text-sm font-semibold uppercase tracking-wide  bg-primary_color_1 hover:bg-yellow_1 text-white hover:text-neutral-800 transition-all duration-200 ease-in-out flex items-center justify-center gap-4"
            >
              {loading ? <AnimatedLoader /> : "SIGNUP"}
            </button>

            <div className="flex gap-2 font-semibold pt-3">
              <p>Already Registered ?</p>
              <Link
                className="text-primary_color_2 transition-all ease-in-out  hover:text-yellow_1"
                to="/login"
              >
                Login Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;

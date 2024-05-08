import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiErrorWarningFill } from "react-icons/ri";
import { loadUser, signIn } from "../../../services/app/actions/auth.action";
import AnimatedLoader from "../../utils/AnimatedLoader";
import { useAppDispatch, useAppSelector } from "../../../hooks";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [UnameOrEmail, setUnameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn({ UnameOrEmail, password })).then((data) => {
      const res = data.payload;
      if (res.success) {
        navigate("/");
        dispatch(loadUser());
      } else {
        setErrorMessage(res.message);
      }
    });
  };

  return (
    <section className="font-poppins tracking-wide mt-[53px] box-border">
      <div className="flex justify-center items-center p-10">
        <div className="w-[430px] h-[600px] p-4 pt-[100px]  border-primary_color_1 border-opacity-35 border-y-[5px]">
          <h2 className="text-3xl text-center font-bold font-prozaLibre tracking-tight text-primary_color_1">
            LearnSphere<span className=" text-yellow_1">.</span>
          </h2>
          <h2 className="text-lg font-semibold text-center mt-6 mb-3 text-neutral-800">
            Login to your LearnSphere account
          </h2>

          <form onSubmit={submitHandler} className="flex flex-col">
            {errorMessage ? (
              <p className="text-xs font-semibold flex gap-1 items-center text-red-700">
                <span>
                  <RiErrorWarningFill />
                </span>
                {errorMessage}
              </p>
            ) : null}

            <input
              className="border-2 border-gray-500 px-3 py-3 mb-8 text-sm placeholder:font-semibold  placeholder:text-neutral-500 outline-none"
              placeholder="Username / Email"
              type="text"
              value={UnameOrEmail}
              onChange={(e) => setUnameOrEmail(e.target.value)}
            />
            <input
              className="border-2 border-gray-500 px-3 py-3 text-sm placeholder:font-semibold placeholder:text-neutral-500 outline-none"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className=" cursor-pointer text-right mb-5 text-sm font-semibold py-[0.5px] text-primary_color_2 hover:text-yellow_1"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              Show Password
            </span>

            <button className="px-3 py-3 text-sm font-semibold uppercase tracking-wide  bg-primary_color_1 hover:bg-yellow_1 text-white hover:text-neutral-800 transition-all duration-200 ease-in-out flex items-center justify-center gap-3">
              {loading ? <AnimatedLoader /> : "Login"}
            </button>

            <div className="flex gap-2 font-semibold pt-3">
              <p>Don't have an account ?</p>
              <Link
                className="text-primary_color_2 transition-all ease-in-out  hover:text-yellow_1"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

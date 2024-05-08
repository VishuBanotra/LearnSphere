import { useState } from "react";
import Left from "../../assets/Left.svg";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createCourse } from "../../services/app/actions/instructor.action";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [thumbNail, setThumbNail] = useState<string | Blob>("");

  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.courses);

  // Submit Handler
  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("thumbNail", thumbNail);

    try {
      dispatch(createCourse(formData)).then((onFulfilled) => {
        const message = onFulfilled.payload?.message;
        toast.success(message, {
          position: "top-center",
        });
      });
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setThumbNail("");
    } catch (error) {
      toast.error("Error Creating Course.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="lg:grid grid-cols-1 lg:grid-cols-2 md:justify-items-center">
      <div className="hidden lg:block lg:mt-[300px] xl:mt-[190px]">
        <img className=" lg:w-[80%] xl:w-[90%]" src={Left} alt="" />
      </div>
      <div className=" mx-auto font-poppins mt-[80px] px-5">
        <h2 className=" text-primary_color_1 text-3xl font-semibold tracking-wider flex justify-center gap-2">
          Create Your Own Course{" "}
          <span className=" text-yellow_1 text-4xl">{">"}</span>{" "}
        </h2>
        <form
          className="mt-[70px]"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <div className="flex flex-col gap-5 justify-center my-10 ">
            <label
              className="text-xl font-semibold tracking-wide"
              htmlFor="title"
            >
              How about a Working Title ?
            </label>
            <input
              className="px-3 py-3 border-2 outline-none"
              id="title"
              type="text"
              name="title"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-5 justify-center my-10 ">
            <label
              className="text-xl font-semibold tracking-wide"
              htmlFor="description"
            >
              Offer a compelling summary of your course content and benefits.
            </label>
            <input
              className="px-3 py-3 border-2 outline-none"
              id="description"
              type="text"
              name="description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-5 justify-center my-10 ">
            <label
              className="text-xl font-semibold tracking-wide"
              htmlFor="price"
            >
              What would be the ideal price point for your course?
            </label>
            <input
              className="px-3 py-3 border-2 outline-none"
              id="price"
              type="text"
              name="price"
              placeholder="Set Price (in Rs.)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-5 justify-center my-10 ">
            <label
              className="text-xl font-semibold tracking-wide"
              htmlFor="category"
            >
              What category best fits the knowledge you'll share?
            </label>
            <select
              className=" outline-none bg-blue-50 px-3 py-4"
              name="categories"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="select">Select a Category</option>
              <option value="development">Development</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
              <option value="design">Design</option>
              <option value="photography">Photography</option>
              <option value="it">Information Technology</option>
              <option value="engineering">Engineering</option>
            </select>
          </div>

          <div className="flex flex-col gap-5 justify-center my-10 ">
            <label
              className="text-xl font-semibold tracking-wide"
              htmlFor="thumbNail"
            >
              Provide a thumbnail image of your course.
            </label>
            <input
              id="thumbNail"
              name="thumbNail"
              type="file"
              onChange={(e) => {
                if (e.target.files !== null) {
                  setThumbNail(e.target.files[0]);
                }
              }}
            />
          </div>
          <button
            disabled={
              loading || !(title && description && price && category).trim()
            }
            className={`py-3 px-4 mt-3 bg-primary_color_1 font-bold text-primary_white_1 tracking-wider rounded-sm transition-all duration-75 hover:bg-yellow_1 hover:text-black ${
              !loading ? "opacity-100" : "opacity-50"
            } cursor-pointer ${
              !(title && description && price && category) &&
              " hover:bg-primary_color_1 hover:text-primary_white_1 cursor-not-allowed"
            }`}
            type="submit"
          >
            {loading ? "Creating...." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseUpload;

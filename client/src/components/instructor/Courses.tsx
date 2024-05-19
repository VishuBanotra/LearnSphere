import { useEffect, useState } from "react";
import CourseCard from "../pages/Courses/CourseCard";
import { useAppSelector } from "../../services/app/hooks";
import { useAppDispatch } from "../../services/app/hooks";
import { fetchedCourses } from "../../services/app/actions/instructor.action";

import { MoonLoader } from "react-spinners";

const Courses = () => {
  const { courses, loading } = useAppSelector((state) => state.courses);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchedCourses());
  }, [dispatch]);

  return loading ? (
    <MoonLoader color="#0070F9" cssOverride={{ margin: "300px auto" }} />
  ) : (
    <div className="mx-auto">
      <h2 className="my-10 text-center font-poppins text-xl font-semibold tracking-wider">
        Courses you have created
      </h2>
      <div className="md:m-10 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center ">
        {courses?.map(
          (
            course: {
              title: string;
              description: string;
              createdBy: { fullname: string };
              thumbNail: string;
              price: string;
            },
            index
          ) => {
            return (
              <div key={index} className="md:mt-5 md:mx-2">
                <CourseCard
                  title={course.title}
                  createdBy={course.createdBy.fullname}
                  thumbNail={course.thumbNail}
                  price={course.price}
                  rating={"4"}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Courses;

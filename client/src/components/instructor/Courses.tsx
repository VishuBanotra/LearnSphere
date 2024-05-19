import axios from "axios";
import { connection } from "../../config/config";
import { useEffect, useState } from "react";
import CourseCard from "../pages/Courses/CourseCard";

const Courses = () => {
  
  const [courses, setCourses] = useState([])



  return (
    <div className="mx-auto">
      <h2 className="my-10 text-center font-poppins text-xl font-semibold tracking-wider">
        Courses you have created
      </h2>
      <div className="md:m-10 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center ">
        {Array.isArray(courses) && courses.length !== 0 ? (
          courses?.map(
            (course: {
              title: string;
              description: string;
              createdBy: { fullname: string };
              thumbNail: string;
              price: string;
            }) => {
              return (
                <div className="md:mt-5 md:mx-2">
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
          )
        ) : (
          <div>No Course Found</div>
        )}
      </div>
    </div>
  );
};

export default Courses;

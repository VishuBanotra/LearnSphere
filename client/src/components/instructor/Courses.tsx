import axios from "axios";
import { connection } from "../../config/config";
import { useEffect, useState } from "react";
import CourseCard from "../pages/Courses/CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState<[] | null>(null);

  useEffect(() => {
    const fetchedCourses = async () => {
      try {
        const fetchCourse = await axios.get(
          `${connection}/instructor/courses/${1}/${5}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const courseData = fetchCourse.data.result.totalCourses;
        setCourses(courseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedCourses();
  }, []);

  console.log(courses);

  return (
    <div className="mx-auto">
      <h2 className="my-10 text-center font-poppins text-xl font-semibold tracking-wider">
        Courses you have created
      </h2>
      <div className="">
        {courses && courses.length !== 0 ? (
          courses?.map(
            (
              course: {
                title: string;
                description: string;
                createdBy: { fullname: string };
                thumbNail: string;
                price: string;
              },
              i
            ) => {
              return (
                <CourseCard
                  title={course.title}
                  createdBy={course.createdBy.fullname}
                  thumbNail={course.thumbNail}
                  price={course.price}
                  rating={"4"}
                />
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

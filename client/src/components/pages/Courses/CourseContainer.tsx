import CourseCard from "./CourseCard";

const CourseContainer = () => {
  return (
    <section className="mx-auto md:w-[90%]">
      <h2 className="font-poppins font-semibold tracking-wider text-[30px] text-center my-10">
        All Courses
      </h2>

      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
        <CourseCard
          title={"Course Titile"}
          createdBy={"course.createdBy.fullname"}
          thumbNail={"course.thumbNail"}
          price={"course.price"}
          rating={"4"}
        />
      </div>
    </section>
  );
};

export default CourseContainer;

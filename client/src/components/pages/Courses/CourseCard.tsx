interface CourseProps {
  title: string;
  thumbNail: string;
  createdBy: string;
  rating: string;
  price: string;
}

const CourseCard = (props: CourseProps) => {
  return (
    <div className="px-3 my-4 md:my-0 md:px-0">
      <div className="border px-3 md:p-0 w-full h-[130px] md:w-[300px] md:h-[300px] flex justify-between items-center md:block">
        <div>
          <img className="h-[100px] md:h-[100%]" src={props.thumbNail} alt="" />
        </div>

        <div className="md:p-2 w-[50%] md:w-[100%]">
          <p className="font-poppins font-semibold tracking-wide">
            {props.title}
          </p>
          <p className="font-poppins text-[13px] text-gray-600 font-semibold tracking-wide">
            {props.createdBy}
          </p>
          <p className="font-poppins font-semibold tracking-wide">
            {" "}
            {props.rating} ☆
          </p>
          <p className="font-poppins font-semibold tracking-wide">
            ₹ {props.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

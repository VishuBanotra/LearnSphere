
const Community = () => {
  return (
    <section className="bg-blue-950 ">
      <Card />
      <Card />
      <Card />
    </section>
  );
};

export default Community;

const Card = () => {
  return (
    <div className="mx-auto w-[750px] border-x p-2">
      <div className="p-3 h-[390px] w-full border flex flex-col">
        <div className="flex justify-center items-center gap-3">
          <img
            className="h-12 rounded-[100%]"
            src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=826&t=st=1713185055~exp=1713185655~hmac=518581911086586a67a3e4bdd5c42f69d61bc85fa248004eb0d94041b9ec6f62"
            alt=""
          />
          <h2 className="text-white">Name</h2>
        </div>

        <div className="flex justify-center">
          <div className="bg-white w-[600px] h-[200px]">This is Image</div>
        </div>

        <div className="flex justify-between content-center">
          <button className="text-white">Like</button>
          <button className="text-white">Like</button>
          <button className="text-white">Like</button>
        </div>
      </div>
    </div>
  );
};

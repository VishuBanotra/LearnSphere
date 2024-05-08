import app from ".";
import connectdb from "./config/db.config";
import Razorpay from "razorpay";

const PORT = process.env.PORT || 5000;
connectdb();

var instance = new Razorpay({
  key_id: String(process.env.RAZORPAY_ID),
  key_secret: process.env.RAZORPAY_SECRET,
});



app.listen(PORT, () => {
  console.log(`Server is Listening on PORT : ${PORT}`);
});

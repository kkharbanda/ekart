import app from "./app.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/database.js";

connectDB();
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });
  app.get("/",(req,res,done)=>{
    res.send("working")
    })
app.listen(process.env.PORT,()=>(
  `Server is working on PORT: ${process.env.PORT}, in ${process.env.NODE_ENV} MODE`
))
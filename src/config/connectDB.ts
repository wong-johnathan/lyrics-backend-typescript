import mongoose from "mongoose";
import { MONGOURI } from ".";
console.log(MONGOURI)
const connectDB = () => {
  if (MONGOURI) {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(MONGOURI)
      .then(() => console.log("DB Connected"))
      .catch(e => {
        console.log(e.message);
        process.exit(1);
      });
  } else {
    console.log("No Mongodb uri provided");
    process.exit(1);
  }
};

export default connectDB;

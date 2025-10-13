import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  balance: { type: Number, required: true, min: 0 },
});

const Account = mongoose.model("Account", accountSchema);
export default Account;

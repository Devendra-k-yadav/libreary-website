const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ================= CONNECT MONGODB =================
mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ================= SCHEMA =================
const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  plan: String,
  date: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);

// ================= API ROUTE =================
app.post("/api/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ success: true, message: "Booking Saved Successfully" });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// ================= START SERVER =================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
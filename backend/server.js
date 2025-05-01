require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


const paymentSchema = new mongoose.Schema({
  amount: Number,
  days: Number,
  roomType: String,
  date: { type: Date, default: Date.now }
});
const Payment = mongoose.model("Payment", paymentSchema);


const ratingSchema = new mongoose.Schema({
  feedback: String,
  date: { type: Date, default: Date.now }
});
const Rating = mongoose.model("Rating", ratingSchema);


app.post("/api/payment", async (req, res) => {
  try {
    const { amount, days, roomType } = req.body;
    if (!amount || !days || !roomType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newPayment = new Payment({ amount, days, roomType });
    await newPayment.save();

    res.status(201).json({ message: "Payment recorded successfully" });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ error: "Failed to record payment" });
  }
});

app.post("/api/feedback", async (req, res) => {
  try {
    const { feedback } = req.body;
    if (!feedback) {
      return res.status(400).json({ error: "Feedback is required" });
    }

    const newFeedback = new Rating({ feedback });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Feedback Error:", error);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

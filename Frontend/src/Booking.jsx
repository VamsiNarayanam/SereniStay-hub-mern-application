import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Booking() {
  const { roomId } = useParams();
  const { state } = useLocation();
  const room = state?.room;
  const [days, setDays] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const total = days * (room?.price || 0);

  async function loadRazorpayScript() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }



  async function handlePayment() {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay failed to load. Are you online?");
      return;
    }

    try {
      const options = {
        key: "rzp_test_R4UHun3Y7fdmgD",
        amount: total * 100,
        currency: "INR",
        name: "SereniStay",
        description: "Room Booking Payment",
        handler: async function (response) {

          try {
            await axios.post("http://localhost:5000/api/payment", {
              amount: total,
              roomType: room?.type
            });
            setPaymentSuccess(true);
            setTimeout(() => {
              navigate("/home");
            }, 3000);
          } catch (err) {
            console.error("Error saving payment info:", err);
          }
        },
        prefill: {
          name: "vamsi",
          email: "vamikrish.rock@gmail.com",
          contact: "9582908655",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again!");
    }
  }


  return (
    <div style={{ minHeight: '80vh' }}>
      <div className="form-container">
        <h2>Book: {room?.type}</h2>
        <p>Price per day: ₹{room?.price}</p>
        <label>No. of Days:</label>
        <input
          id="daysInput"
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          min="1"
        />
        <p>Total: ₹{total}</p>
        <button id="pay" onClick={handlePayment}>Pay</button>

        {/* Success message */}
        {paymentSuccess && (
          <div className="payment-success">
            ✅ Payment Successful!
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;

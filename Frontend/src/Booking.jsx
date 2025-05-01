import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios"

function Booking() {
  const { roomId } = useParams();
  const { state } = useLocation();
  const room = state?.room;
  const [days, setDays] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const total = days * (room?.price || 0);

  async function handlePayment() {
    try {

      await axios.post("http://localhost:5000/api/payment", {
        amount: total,
        days,
        roomType: room?.type,
      });

      setPaymentSuccess(true);

      setTimeout(() => {
        navigate("/home");
      }, 3000);
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

        {/* Show success message */}
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

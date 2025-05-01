import { useState } from "react";
import axios from "axios"

function Home() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = async () => {
    if (!feedback) {
      alert("Please enter feedback before submitting.");
      return;
    }

    try {

      await axios.post("http://localhost:5000/api/feedback", {
        feedback,
      });

      setSubmitted(true);

      setTimeout(() => {
        setFeedback("");
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Feedback error:", error);
      alert("Failed to submit feedback. Try again!");
    }
  };

  return (
    <div className="home-container">
      <h1 id="welcomeHeading">Welcome to Sereni-Stay</h1>
      <p>SereniStay offers serene, vegetarian-only stays for families, couples, and solo travelers,
        with exclusive access to Radiant Revels (events) and Planta Feast (vegetarian recipes).</p>

      <div className="photo-gallery">
        <figure>
          <img src="/images/building.jpg" alt="Hotel Room" />
          <figcaption>Hotel</figcaption>
        </figure>
        <figure>
          <img src="/images/hotel-resort.jpg" alt="Resort" />
          <figcaption>Resort</figcaption>
        </figure>
        <figure>
          <img src="/images/family-room.jpg" alt="Room" />
          <figcaption>Room</figcaption>
        </figure>
      </div>
      <h2>Come and explore all that our Resort has to offer!</h2>
      <div className="photo-gallery">
        <figure>
          <img src="/images/Event.jpeg" alt="Events" />
          <figcaption>Radient Revels Event</figcaption>
        </figure>
        <figure>
          <img src="/images/Recipe.jpg" alt="Recipes" />
          <figcaption>Planta Feast Recipe</figcaption>
        </figure>
        <figure>
          <img src="/images/Indoor-game.jpg" alt="indoor" />
          <figcaption>Indoor games</figcaption>
        </figure>
      </div>

      <div className="feedback-container">
        <h3>REVIEW YOUR EXPERIENCE</h3>

        {!submitted ? (
          <>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback here..."
            ></textarea>
            <br />
            <button onClick={handleFeedback}>Submit Feedback</button>
          </>
        ) : (
          <div className="success-message">
            ✅ Thank you for your feedback!
          </div>
        )}
      </div>

    </div>

  );
}

export default Home;
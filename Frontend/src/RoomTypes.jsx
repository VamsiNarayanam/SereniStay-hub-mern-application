import { useNavigate } from "react-router-dom";

function RoomTypes() {
  const navigate = useNavigate();

  const rooms = [
    { id: 1, type: "Family Room", price: 3000, img: "/images/family-room.jpg" },
    { id: 2, type: "Couple Room", price: 2500, img: "/images/couple-room.jpg" },
    { id: 3, type: "Solo Room", price: 2000, img: "/images/solo-room.jpg" }
  ];

  return (
    <div className="room-types-container">
      <h2 className="room-types-heading">Select a Room Type</h2>
      {rooms.map((room) => (
        <div
          className="room-card"
          key={room.id}
          onClick={() => navigate(`/booking/${room.id}`, { state: { room } })}
        >
          <img src={room.img} alt={room.type} />
          <h3>{room.type}</h3>
          <p>Price: ₹{room.price}</p>
        </div>
      ))}
    </div>

  );
}

export default RoomTypes;
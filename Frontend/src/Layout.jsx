import { Outlet, Link, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) {
      stored.isLoggedIn = false;
      localStorage.setItem("user", JSON.stringify(stored));
    }
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/home">HOME</Link>
        <Link to="/rooms">BOOK A ROOM</Link>
        <a href="https://radiant-revels-event-application.vercel.app/" target="_blank">RADIENT REVELS</a>
        <a href="https://planta-feast-recipes-application.vercel.app/" target="_blank">PLANTA RECIPES</a>
        <button onClick={handleLogout}>LOGOUT</button>
      </nav>
      <Outlet />
      <footer>© 2025 SereniStay. All rights reserved.</footer>
    </>
  );
}

export default Layout;
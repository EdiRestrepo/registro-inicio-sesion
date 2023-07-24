import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header
      style={{
        border: "1px solid black",
        padding: "0 18px",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          height: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15,
          }}
        >
          <h2>
            {" "}
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "unset" }}
            >
              My New App
            </NavLink>
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            gap: 15,
            alignItems: "center",
          }}
        >
          <h3>
            <NavLink
              to="/register"
              style={{ textDecoration: "none", color: "unset" }}
            >
              Register
            </NavLink>
          </h3>
          <h3>
            <NavLink
              to="/login"
              style={{ textDecoration: "none", color: "unset" }}
            >
              Login
            </NavLink>
          </h3>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;

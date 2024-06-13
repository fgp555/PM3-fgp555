import styles from "./NavBar.module.css";
import logo from "../../assets/favicon.ico";
import avatar from "../../assets/react.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { removeUser } from "../../redux/userSlice";
import { exit } from "../../redux/store";

const NavBar = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.login);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(exit());
    // dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.linksSection}>
        <Link to="/">Home</Link>

        {isLogin ? (
          <>
            <Link to="/mis-turnos">Mis Turnos</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
      <div className={styles.avatarSection}>
        <div>
          <img src={avatar} alt="Avatar" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

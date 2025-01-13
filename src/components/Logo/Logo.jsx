import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import css from "./Logo.module.css";

const Logo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? (
    <span className={css.logo}>
      <p>AquaTrack</p>
    </span>
  ) : (
    <Link to="/" className={css.logo}>
      <p>AquaTrack</p>
    </Link>
  );
};

export default Logo;

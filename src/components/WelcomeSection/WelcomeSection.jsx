import { Link } from "react-router-dom"
import Logo from "../Logo/Logo"
import s from "./WelcomeSection.module.css"

const WelcomeSection = () => {
  return (
    <div className={s.welcome_section}>
      <div>
        <Logo />
        <div className={s.basic_container}>
          <h2 className={s.h2}>Record daily water intake and track</h2>
          <h1 className={s.h1}>Water consumption tracker</h1>
          <div className={s.link_container}>
            <Link className={s.register_btn} to="/signup">Try tracker</Link>
            <Link className={s.login_btn} to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeSection
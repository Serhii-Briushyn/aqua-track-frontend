import UserBarPopover from "../UserBarPopover/UserBarPopover";
import css from "./UserBar.module.css";
import {useState} from "react";
const UserBar = () => {
  const temporaryAvatar = 'https://www.w3schools.com/howto/img_avatar.png'

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.userBar}>
        <h2 className={css.h2}>Nadia</h2>
        <div className={css.userAvatar}>
            <img src={temporaryAvatar} alt="avatar" />
        </div>
        <button
            role="button"
            className={css.btn}
            onClick={() => setIsOpen(!isOpen)}
        >

        </button>
        {isOpen && <UserBarPopover/>}
    </div>
  );
};

export default UserBar;

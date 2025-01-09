import { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import css from "./UserSettingsForm.module.css";
import icons from "../../assets/icons/icons.svg";

Modal.setAppElement("#modal-root");

const UserSettingsForm = () => {
  const [avatarURL, setAvatarURL] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/user-settings") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const avatarURL = URL.createObjectURL(file);
      setAvatarURL(avatarURL);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
      <form className={css.userSettingsForm}>
        <div className={css.userAvatarContainer}>
          {avatarURL ? (
            <img src={avatarURL} alt="User Avatar" className={css.userAvatar} />
          ) : (
            <FaUserCircle className={css.iconUser} />
          )}
          <button className={css.uploadPhotoBtn}>
            <div className={css.btnIconContainer}>
              <svg width="20" height="20">
                <use href={`${icons}#icon-upload`} />
              </svg>
              <span className={css.inputText}>Upload Photo</span>
            </div>
            <input
              type="file"
              className={css.fileInput}
              id="fileInput"
              name="avatar"
              onChange={handleFileSelect}
            />
          </button>
        </div>
        <div className={css.settingsForm}>
          <div>
            <fieldset className={css.genderContainer}>
              <legend className={`${css.genderLegend} ${css.inputTitle}`}>
                Your Gender Identity
              </legend>
              <label className={`${css.genderLabel} ${css.inputText}`}>
                <input
                  type="radio"
                  className={css.genderInput}
                  value="woman"
                  name="gender"
                />
                Woman
              </label>
              <label className={`${css.genderLabel} ${css.inputText}`}>
                <input
                  type="radio"
                  className={css.genderInput}
                  value="man"
                  name="gender"
                />
                Man
              </label>
            </fieldset>
          </div>
          <div className={css.userInfoContainer}>
            <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
              Your Name
              <input
                type="text"
                name="name"
                className={`${css.userInfoField} ${css.inputText}`}
              />
            </label>
            <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
              Email
              <input
                type="email"
                name="email"
                className={`${css.userInfoField} ${css.inputText}`}
              />
            </label>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default UserSettingsForm;

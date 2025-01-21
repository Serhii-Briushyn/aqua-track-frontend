import {useSelector} from "react-redux";
import {selectUser} from "../../redux/auth/selectors";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import css from "./UserBar.module.css";
import {useCallback, useEffect, useRef, useState} from "react";

import icons from "../../assets/icons/icons.svg";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal.jsx";
import LogOutModal from "../LogOutModal/LogOutModal.jsx";

const UserBar = ({userName}) => {
	const user = useSelector(selectUser);
	const userBarRef = useRef(null);

	const [isOpen, setIsOpen] = useState(false);
	const [modalsState, setModalsState] = useState({
		isSettingsModalOpen: false,
		isLogOutModalOpen: false,
	});

	const getAvatarContent = () => {
		if (user?.avatar) {
			return <img src={user.avatar} alt="avatar"/>;
		}

		const initial = userName ? userName[0].toUpperCase() : "U";
		return <span className={css.initial}>{initial}</span>;
	};

	const handleToggle = (e) => {
		e.stopPropagation();
		setIsOpen((prev) => !prev);
	};

	const toggleModal = useCallback((modalName) => {
		setModalsState((prevState) => ({
			...prevState,
			[modalName]: !prevState[modalName],
		}));
	}, []);

	const closeSettingsModal = useCallback(() => {
		setModalsState((prevState) => ({
			...prevState,
			isSettingsModalOpen: false,
		}));
	}, []);

	const closeLogOutModal = useCallback(() => {
		setModalsState((prevState) => ({
			...prevState,
			isLogOutModalOpen: false,
		}));
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (userBarRef.current && !userBarRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<div className={css.relativeContainer} ref={userBarRef}>
				<div className={css.userBar} onClick={handleToggle}>
					<h2 className={css.h2}>{userName}</h2>
					<div className={css.userAvatar}>{getAvatarContent()}</div>
					<button role="button" className={css.btn}>
						<svg className={`${css.svg} ${isOpen ? css.rotated : ""}`}>
							<use href={`${icons}#icon-arrow-down`}/>
						</svg>
					</button>
				</div>
				{isOpen && <UserBarPopover toggleModal={toggleModal}/>}
			</div>
			<UserSettingsModal
				isOpen={modalsState.isSettingsModalOpen}
				onClose={closeSettingsModal}
			/>
			<LogOutModal
				isOpen={modalsState.isLogOutModalOpen}
				onClose={closeLogOutModal}
			/>
		</>
	);
};

export default UserBar;

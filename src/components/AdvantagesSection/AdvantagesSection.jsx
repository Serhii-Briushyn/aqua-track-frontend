import s from "./AdvantagesSection.module.css";
import { selectUserCount, selectIsLoading } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserCount } from "../../redux/auth/operations";
import Loader from "../Loader/Loader";
import icons from "../../assets/icons/icons.svg";

import cust1Mob from "../../assets/images/1-customers-mob-min.png";
import cust1Mob2x from "../../assets/images/1-customers-mob@2x-min.png";
import cust1Tab from "../../assets/images/1-customers-desk-tab-min.png";
import cust1Tab2x from "../../assets/images/1-customers-desk-tab@2x-min.png";
import cust2Mob from "../../assets/images/2-customers-mob-min.png";
import cust2Mob2x from "../../assets/images/2-customers-mob@2x-min.png";
import cust2Tab from "../../assets/images/2-customers-desk-tab-min.png";
import cust2Tab2x from "../../assets/images/2-customers-desk-tab@2x-min.png";
import cust3Mob from "../../assets/images/3-customers-mob-min.png";
import cust3Mob2x from "../../assets/images/3-customers-mob@2x-min.png";
import cust3Tab from "../../assets/images/3-customers-desk-tab-min.png";
import cust3Tab2x from "../../assets/images/3-customers-desk-tab@2x-min.png";

import { useTranslation } from "react-i18next";

const AdvantagesSection = () => {
  const avatars = [
    {
      mob: cust1Mob,
      mob2x: cust1Mob2x,
      tab: cust1Tab,
      tab2x: cust1Tab2x,
      alt: "User avatar 1",
    },
    {
      mob: cust2Mob,
      mob2x: cust2Mob2x,
      tab: cust2Tab,
      tab2x: cust2Tab2x,
      alt: "User avatar 2",
    },
    {
      mob: cust3Mob,
      mob2x: cust3Mob2x,
      tab: cust3Tab,
      tab2x: cust3Tab2x,
      alt: "User avatar 3",
    },
  ];

  const [currentAvatars, setCurrentAvatars] = useState(avatars);

  const usersCount = useSelector(selectUserCount);
  const usersLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (usersCount === null) {
      dispatch(getUserCount());
    }
  }, [dispatch, usersCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAvatars((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.main}>
      <div className={s.customers}>
        {usersLoading ? (
          <Loader />
        ) : (
          <div className={s.wrapperAvatar}>
            {currentAvatars.map((avatars, index) => (
              <div className={s.customer} key={index}>
                <picture className={s.pictureBox}>
                  <source
                    srcSet={`${avatars.tab} 1x, ${avatars.tab2x} 2x`}
                    media="(min-width: 768px)"
                  />
                  <source
                    srcSet={`${avatars.mob} 1x, ${avatars.mob2x} 2x`}
                    media="(max-width: 767px)"
                  />
                  <img src={avatars.mob} alt={avatars.alt} />
                </picture>
              </div>
            ))}
            <div className={s.numberCust}>+{usersCount}</div>
          </div>
        )}

        <p className={s.text}>
          {t("userCountTextOur")}{" "}
          <span className={s.coloredText}>
            {t("userCountTextHappy")}
            <br />{" "}
          </span>{" "}
          {t("userCountTextCust")}
        </p>
      </div>
      <div className={s.benefits}>
        <div className={s.commonCont}>
          <div className={s.firstBen}>
            <svg className={s.point}>
              <use xlinkHref={`${icons}#icon-circle`} />
            </svg>
            <p className={s.benText}>{t("habitDrive")}</p>
          </div>
          <p className={s.secBen}>{t("viewStats")}</p>
        </div>
        <p className={s.thirdBen}>{t("personalRate")}</p>
      </div>
    </div>
  );
};

export default AdvantagesSection;

import s from "./AdvantagesSection.module.css";
import { selectUserCount, selectIsLoading } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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

const AdvantagesSection = () => {
  const usersCount = useSelector(selectUserCount);
  const usersLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!usersLoading && usersCount === null) {
      dispatch(getUserCount());
    }
  }, [dispatch, usersLoading, usersCount]);

  return (
    <div className={s.main}>
      <div className={s.customers}>
        {usersLoading ? (
          <Loader />
        ) : (
          <div className={s.wrapperAvatar}>
            <div className={s.customer}>
              <picture>
                <source
                  srcSet={`${cust1Tab} 1x, ${cust1Tab2x} 2x`}
                  media="(min-width: 768px)"
                />
                <source
                  srcSet={`${cust1Mob} 1x, ${cust1Mob2x} 2x`}
                  media="(max-width: 767px)"
                />
                <img src={cust1Mob} alt="user avatar" />
              </picture>
            </div>
            <div className={s.customer}>
              <picture>
                <source
                  srcSet={`${cust2Tab} 1x, ${cust2Tab2x} 2x`}
                  media="(min-width: 768px)"
                />
                <source
                  srcSet={`${cust2Mob} 1x, ${cust2Mob2x} 2x`}
                  media="(max-width: 767px)"
                />
                <img src={cust2Mob} alt="user avatar" />
              </picture>
            </div>
            <div className={s.customer}>
              <picture>
                <source
                  srcSet={`${cust3Tab} 1x, ${cust3Tab2x} 2x`}
                  media="(min-width: 768px)"
                />
                <source
                  srcSet={`${cust3Mob} 1x, ${cust3Mob2x} 2x`}
                  media="(max-width: 767px)"
                />
                <img src={cust3Mob} alt="user avatar" />
              </picture>
            </div>
            <div className={s.numberCust}>+{usersCount}</div>
          </div>
        )}

        <p className={s.text}>
          Our <span className={s.coloredText}>happy</span> customers
        </p>
      </div>
      <div className={s.benefits}>
        <div className={s.commonCont}>
          <div className={s.firstBen}>
            <svg className={s.point}>
              <use xlinkHref={`${icons}#icon-circle`} />
            </svg>
            <p className={s.benText}>Habit drive</p>
          </div>
          <p className={s.secBen}>View statistics</p>
        </div>
        <p className={s.thirdBen}>Personal rate setting</p>
      </div>
    </div>
  );
};

export default AdvantagesSection;

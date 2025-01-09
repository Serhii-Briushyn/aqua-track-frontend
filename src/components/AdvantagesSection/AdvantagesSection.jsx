import s from "./AdvantagesSection.module.css";
const AdvantagesSection = () => {
  return (
    <div className={s.main}>
      <div className={s.customers}>
        <div className={s.customer}></div>
        <p className={s.text}>
          Our <span className={s.coloredText}>happy</span> customers
        </p>
      </div>
      <div className={s.benefits}>
        <div className={s.commonCont}>
          <div className={s.firstBen}>
            <div className={s.point}></div>
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

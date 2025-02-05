import smile from "../../src/assets/images/smile.png";

export const steps = (t) => [
  {
    content: (
      <div className="tour-step">
        <h2 className="tour-subtitle">{t("welcomeTitle")}</h2>
        <p className="tour-text">{t("welcomeText")}</p>
      </div>
    ),
    position: "center",
  },
  {
    selector: '[data-tour="welcome-message"]',
    content: (
      <div className="tour-step">
        <p className="tour-text">{t("welcomeMessage")}</p>
      </div>
    ),
  },
  {
    selector: '[data-tour="daily-norm"]',
    content: (
      <div className="tour-step">
        <p className="tour-text">{t("dailyNorm")}</p>
      </div>
    ),
  },
  {
    selector: '[data-tour="today-progress"]',
    content: (
      <div className="tour-step">
        <p className="tour-text">{t("todayProgress")}</p>
      </div>
    ),
  },
  {
    selector: '[data-tour="add-water-btn"]',
    content: (
      <div className="tour-step">
        <p className="tour-text">{t("addWaterBtn")}</p>
      </div>
    ),
  },
  {
    selector: '[data-tour="calendar-section"]',
    content: (
      <div className="tour-step">
        <p className="tour-text">{t("calendarSection")}</p>
      </div>
    ),
  },
  {
    selector: '[data-tour="profile-settings"]',
    content: (
      <div className="tour-step">
        <p className="tour-text">{t("profileSettings")}</p>
      </div>
    ),
  },
  {
    selector: '[data-tour="water-history"]',
    content: (
      <div className="tour-step">
        <p className="tour-text">{t("waterHistory")}</p>
      </div>
    ),
  },
  {
    content: (
      <div className="tour-step ">
        <img className="tour-image" src={smile} alt="Smile" />
        <span className="tour-span">
          <p className="tour-text">{t("finalText")}</p>
          <p className="tour-text">{t("finalMotivation")}</p>
        </span>
      </div>
    ),
    position: "center",
  },
];

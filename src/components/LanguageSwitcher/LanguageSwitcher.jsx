import { useTranslation } from "react-i18next";
import { useState } from "react";
import s from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false); // Управление состоянием списка
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Текущий язык

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const languages = [
    { code: "en", label: "EN" },
    { code: "uk", label: "UK" },
    { code: "pl", label: "PL" },
  ];

  return (
    <div className={s.container}>
      <button className={s.dropdownButton} onClick={toggleDropdown}>
        {languages.find((lang) => lang.code === selectedLanguage)?.label ||
          "Select Language"}
      </button>
      {isOpen && (
        <ul className={s.dropdownList}>
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={s.dropdownItem}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;

import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import s from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const dropdownRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languages = [
    { code: "en", label: "EN" },
    { code: "uk", label: "UK" },
    { code: "pl", label: "PL" },
  ];

  return (
    <div className={s.container} ref={dropdownRef}>
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

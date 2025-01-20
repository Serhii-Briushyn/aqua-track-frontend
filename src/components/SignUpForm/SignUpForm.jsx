import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { register } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";
import icons from "../../assets/icons/icons.svg";
import css from "./SignUpForm.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("enterValidEmail"))
      .required(t("emailRequired")),
    password: Yup.string()
      .min(6, t("passwordTooShort"))
      .max(64, t("passwordTooLong"))
      .required(t("passwordRequired")),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("repeatPasswordMustMatch"))
      .required(t("repeatPasswordRequired")),
  });

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    try {
      const requestData = { ...values };
      delete requestData.repeatPassword;
      const response = await dispatch(register(requestData)).unwrap();
      toast.success(response.message || "User registered successfully!");
      reset();
    } catch (error) {
      toast.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordRVisibility = () => {
    setShowPasswordRepeat((prev) => !prev);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={css.container}>
        <div className={css.content}>
          <h2 className={css.title}>{t("signUpTitle")}</h2>
          <form
            className={css.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <label className={css.label}>
              <span className={css.span}>{t("email")}</span>
              <input
                className={`${css.input} ${errors.email ? css.errorInput : ""}`}
                type="email"
                placeholder={t("enterEmail")}
                autoComplete="email"
                {...formRegister("email")}
              />
              {errors.email && (
                <div className={css.errorMessage}>{errors.email.message}</div>
              )}
            </label>

            <label className={css.label}>
              <span className={css.span}>{t("password")}</span>
              <div className={css.passwordContainer}>
                <input
                  className={`${css.input} ${
                    errors.password ? css.errorInput : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("enterPassword")}
                  autoComplete="password"
                  {...formRegister("password")}
                />
                <button
                  type="button"
                  className={css.toggleButton}
                  onClick={togglePasswordVisibility}
                  aria-label="Toggle password visibility"
                >
                  <svg className={css.icon}>
                    <use
                      href={`${icons}#${
                        showPassword ? "icon-view" : "icon-hide"
                      }`}
                    />
                  </svg>
                </button>
              </div>
              {errors.password && (
                <div className={css.errorMessage}>
                  {errors.password.message}
                </div>
              )}
            </label>

            <label className={css.label}>
              <span className={css.span}>{t("repeatPassword")}</span>
              <div className={css.passwordContainer}>
                <input
                  className={`${css.input} ${
                    errors.repeatPassword ? css.errorInput : ""
                  }`}
                  type={showPasswordRepeat ? "text" : "password"}
                  placeholder={t("repeatPassword")}
                  autoComplete="repeat-password"
                  {...formRegister("repeatPassword")}
                />
                <button
                  type="button"
                  className={css.toggleButton}
                  onClick={togglePasswordRVisibility}
                  aria-label="Toggle password visibility"
                >
                  <svg className={css.icon}>
                    <use
                      href={`${icons}#${
                        showPasswordRepeat ? "icon-view" : "icon-hide"
                      }`}
                    />
                  </svg>
                </button>
              </div>
              {errors.repeatPassword && (
                <div className={css.errorMessage}>
                  {errors.repeatPassword.message}
                </div>
              )}
            </label>

            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : t("signUp")}
            </button>
          </form>

          <div className={css.footerContent}>
            <p className={css.text}>
              {t("alreadyHaveAccount")}{" "}
              <NavLink to="/signin" className={css.link}>
                {t("signIn")}
              </NavLink>
            </p>
          </div>
        </div>
        <LanguageSwitcher />
      </div>
    </>
  );
};

export default SignUpForm;

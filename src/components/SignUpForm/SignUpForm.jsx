import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { register } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";

import Loader from "../Loader/Loader";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

import icons from "../../assets/icons/icons.svg";
import css from "./SignUpForm.module.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalidEmail"))
      .required(t("requiredEmail")),
    password: Yup.string()
      .min(6, t("shortPwd"))
      .max(64, t("longPwd"))
      .required(t("requiredPwd")),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("pwdMismatch"))
      .required(t("repeatPwdReq")),
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
      await dispatch(register(requestData)).unwrap();
      toast.success(t("registerSuccess"));
      reset();
    } catch (error) {
      toast.error(t(error));
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
          <h2 className={css.title}>{t("signUp")}</h2>
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
                  placeholder={t("enterPwd")}
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
              <span className={css.span}>{t("repeatPwd")}</span>
              <div className={css.passwordContainer}>
                <input
                  className={`${css.input} ${
                    errors.repeatPassword ? css.errorInput : ""
                  }`}
                  type={showPasswordRepeat ? "text" : "password"}
                  placeholder={t("repeatPwd")}
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
              {isSubmitting
                ? t("submitting")
                : t("signUp")}
            </button>
          </form>

          <div className={css.footerContent}>
            <p className={css.text}>
              {t("alreadyHaveAcc")}{" "}
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

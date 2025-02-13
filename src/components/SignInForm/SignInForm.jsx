import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { getGoogleOAuthUrl, login } from "../../redux/auth/operations.js";
import { selectIsLoading } from "../../redux/auth/selectors.js";

import Loader from "../Loader/Loader.jsx";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";

import icons from "../../assets/icons/icons.svg";
import css from "./SignInForm.module.css";

const SignInForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalidEmail"))
      .required(t("emailRequired")),
    password: Yup.string()
      .min(6, t("shortPwd"))
      .max(64, t("longPwd"))
      .required(t("requiredPwd")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      toast.success(t("loginSuccess"));
      reset();
    } catch (error) {
      toast.error(t(error));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await dispatch(getGoogleOAuthUrl()).unwrap();
      window.location.href = response.data.url;
    } catch (error) {
      toast.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={css.container}>
        <div className={css.content}>
          <h2 className={css.title}>{t("signIn")}</h2>
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
                {...register("email")}
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
                  autoComplete="current-password"
                  {...register("password")}
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

            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t("submitting")
                : t("signIn")}
            </button>
            <p className={css.text} style={{ textAlign: "center" }}>
              {t("or")}
            </p>
            <button
              type="button"
              className={css.button}
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
            >
              <span style={{ marginRight: "4px" }}>
                {t("signInWith")}
              </span>
              <span style={{ color: "#4285f4" }}>G</span>
              <span style={{ color: "#ea4335" }}>o</span>
              <span style={{ color: "#fbbc05" }}>o</span>
              <span style={{ color: "#4285f4" }}>g</span>
              <span style={{ color: "#34a853" }}>l</span>
              <span style={{ color: "#ea4335" }}>e</span>
            </button>
          </form>

          <div className={css.footerContent}>
            <p className={css.text}></p>
            <p className={css.text}>
              {t("noAccount")}{" "}
              <NavLink to="/signup" className={css.link}>
                {t("signUp")}
              </NavLink>
            </p>
            <p className={css.text}>
              {t("forgotPwd")}{" "}
              <NavLink to="/forgot-password" className={css.link}>
                {t("reset")}
              </NavLink>
            </p>
          </div>
        </div>
        <LanguageSwitcher />
      </div>
    </>
  );
};

export default SignInForm;

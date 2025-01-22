import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { resetPassword } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";

import icons from "../../assets/icons/icons.svg";
import css from "./ResetPasswordForm.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const navigate = useNavigate();

  const ResetPasswordSchema = Yup.object({
    password: Yup.string()
      .min(6, t("passwordTooShort"))
      .max(64, t("passwordTooLong"))
      .required(t("passwordRequired")),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("repeatPasswordMustMatch"))
      .required(t("repeatPasswordRequired")),
  });

  const {
    register: resetRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    try {
      const token = new URLSearchParams(location.search).get("token");
      const response = await dispatch(
        resetPassword({ token, password: values.password })
      ).unwrap();
      toast.success(response.message || t("passwordResetSuccess"));
      reset();
      navigate("/signin");
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
          <h2 className={css.title}>{t("resetPasswordTitle")}</h2>
          <form
            className={css.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <label className={css.label}>
              <span className={css.span}>{t("newPassword")}</span>
              <div className={css.passwordContainer}>
                <input
                  className={`${css.input} ${
                    errors.password ? css.errorInput : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("enterPassword")}
                  autoComplete="new-password"
                  {...resetRegister("password")}
                />
                <button
                  type="button"
                  className={css.toggleButton}
                  onClick={togglePasswordVisibility}
                  aria-label="Toggle password visibility"
                >
                  <svg className={css.icon}>
                    <use
                      href={`${icons}#$
                      {showPassword ? "icon-view" : "icon-hide"}`}
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
                  placeholder={t("repeatPasswordInput")}
                  autoComplete="new-password"
                  {...resetRegister("repeatPassword")}
                />
                <button
                  type="button"
                  className={css.toggleButton}
                  onClick={togglePasswordRVisibility}
                  aria-label="Toggle password visibility"
                >
                  <svg className={css.icon}>
                    <use
                      href={`${icons}#$
                      {showPasswordRepeat ? "icon-view" : "icon-hide"}`}
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
              {isSubmitting ? t("resetting") : t("confirm")}
            </button>
          </form>
        </div>
        <LanguageSwitcher />
      </div>
    </>
  );
};

export default ResetPasswordForm;

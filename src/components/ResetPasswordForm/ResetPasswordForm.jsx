import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import { resetPassword } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";

import Loader from "../Loader/Loader";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

import icons from "../../assets/icons/icons.svg";
import css from "./ResetPasswordForm.module.css";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const { t } = useTranslation();

  const ResetPasswordSchema = Yup.object({
    password: Yup.string()
      .min(6, t("shortPwd"))
      .max(64, t("longPwd"))
      .required(t("requiredPwd")),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("pwdMismatch"))
      .required(t("repeatPwdReq")),
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
      await dispatch(
        resetPassword({ token, password: values.password })
      ).unwrap();
      toast.success(t("pwdUpdated"));
      reset();
      navigate("/signin");
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
          <h2 className={css.title}>{t("resetPassword")}</h2>
          <form
            className={css.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <label className={css.label}>
              <span className={css.span}>{t("newPwd")}</span>
              <div className={css.passwordContainer}>
                <input
                  className={`${css.input} ${
                    errors.password ? css.errorInput : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("enterPwd")}
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
              <span className={css.span}>
                {t("repeatPwd")}
              </span>
              <div className={css.passwordContainer}>
                <input
                  className={`${css.input} ${
                    errors.repeatPassword ? css.errorInput : ""
                  }`}
                  type={showPasswordRepeat ? "text" : "password"}
                  placeholder={t("confirmPwd")}
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
                : t("confirm")}
            </button>
          </form>
        </div>
        <LanguageSwitcher />
      </div>
    </>
  );
};

export default ResetPasswordForm;

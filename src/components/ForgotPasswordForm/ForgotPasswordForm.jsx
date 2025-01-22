import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { forgotPassword } from "../../redux/auth/operations.js";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import Loader from "../Loader/Loader.jsx";

import css from "./ForgotPasswordForm.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const ForgotPasswordSchema = Yup.object({
    email: Yup.string().email(t("invalidEmail")).required(t("emailRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(forgotPassword(values)).unwrap();
      toast.success(t("checkEmailForReset"));
      reset();
    } catch (error) {
      toast.error(error);
    }
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
              <span className={css.span}>{t("email")}</span>
              <input
                className={`${css.input} ${errors.email ? css.errorInput : ""}`}
                type="email"
                placeholder={t("enterEmail")}
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <div className={css.errorMessage}>
                  {t(errors.email.message)}
                </div>
              )}
            </label>

            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("submitting") : t("reset")}
            </button>
          </form>
          <div className={css.footerContent}>
            <p className={css.text}>
              {t("dontHaveAccount")}{" "}
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

export default ForgotPasswordForm;

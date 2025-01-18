import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { resetPassword } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";

import icons from "../../assets/icons/icons.svg";
import css from "./ResetPasswordForm.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const ResetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(6, "Must contain at least 6 characters")
    .max(64, "Password can't be longer than 64 characters")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "The passwords do not match")
    .required("Repeat password is required"),
});

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

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
      const fullToken = new URLSearchParams(location.search).get("token");
      const token = fullToken?.split("token=")[1] || fullToken;
      const response = await dispatch(
        resetPassword({ token, newPassword: values.password })
      ).unwrap();
      toast.success(response.message || "Password reset successfully!");
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
          <h2 className={css.title}>Reset Password</h2>
          <form
            className={css.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <label className={css.label}>
              <span className={css.span}>New password</span>
              <div className={css.passwordContainer}>
                <input
                  className={`${css.input} ${
                    errors.password ? css.errorInput : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
              <span className={css.span}>Repeat password</span>
              <div className={css.passwordContainer}>
                <input
                  className={`${css.input} ${
                    errors.repeatPassword ? css.errorInput : ""
                  }`}
                  type={showPasswordRepeat ? "text" : "password"}
                  placeholder="Repeat password"
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
              {isSubmitting ? "Resetting..." : "Confirm"}
            </button>
          </form>
        </div>
        <LanguageSwitcher />
      </div>
    </>
  );
};

export default ResetPasswordForm;

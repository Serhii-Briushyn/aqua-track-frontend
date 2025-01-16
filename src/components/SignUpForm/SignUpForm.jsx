import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { register } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";

import icons from "../../assets/icons/icons.svg";
import css from "./SignUpForm.module.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Must contain at least 6 characters")
    .max(64, "Password can't be longer than 64 characters")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "The passwords do not match")
    .required("Repeat password is required"),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

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
          <h2 className={css.title}>Sign Up</h2>
          <form
            className={css.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <label className={css.label}>
              <span className={css.span}>Email</span>
              <input
                className={`${css.input} ${errors.email ? css.errorInput : ""}`}
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                {...formRegister("email")}
              />
              {errors.email && (
                <div className={css.errorMessage}>{errors.email.message}</div>
              )}
            </label>

            <label className={css.label}>
              <span className={css.span}>Password</span>
              <div className={css.passwordContainer}>
                <input
                  className={`${css.input} ${
                    errors.password ? css.errorInput : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
              <span className={css.span}>Repeat password</span>
              <div className={css.passwordContainer}>
                <input
                  className={`${css.input} ${
                    errors.repeatPassword ? css.errorInput : ""
                  }`}
                  type={showPasswordRepeat ? "text" : "password"}
                  placeholder="Repeat password"
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
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <div className={css.footerContent}>
            <p className={css.text}>
              Already have an account?{" "}
              <NavLink to="/signin" className={css.link}>
                Sign In
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;

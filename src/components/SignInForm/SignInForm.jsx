import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { getGoogleOAuthUrl, login } from "../../redux/auth/operations.js";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import Loader from "../Loader/Loader.jsx";

import icons from "../../assets/icons/icons.svg";
import css from "./SignInForm.module.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Must contain at least 6 characters")
    .max(64, "Password can't be longer than 64 characters")
    .required("Password is required"),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);

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
      const response = await dispatch(login(values)).unwrap();
      toast.success(response.message || "Login successful!");
      reset();
    } catch (error) {
      toast.error(error);
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
          <h2 className={css.title}>Sign In</h2>
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
                {...register("email")}
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
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
            <p className={css.text} style={{ textAlign: "center" }}>
              or
            </p>
            <button
              type="button"
              className={css.button}
              onClick={handleGoogleSignIn}
            >
              <span style={{ marginRight: "4px" }}>Sign in with</span>
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
              Don&apos;t have an account?{" "}
              <NavLink to="/signup" className={css.link}>
                Sign Up
              </NavLink>
            </p>
            <p className={css.text}>
              Forgot Password?{" "}
              <NavLink to="/forgot-password" className={css.link}>
                Reset
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;

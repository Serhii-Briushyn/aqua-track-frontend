import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { login } from "../../redux/auth/operations.js";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import Loader from "../Loader/Loader.jsx";

import icons from "../../assets/icons/icons.svg";
import css from "./SignInForm.module.css";

const initialValues = {
  email: "",
  password: "",
};

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

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className={css.form} autoComplete="off">
                <label className={css.label}>
                  <span className={css.span}>Email</span>
                  <Field
                    className={`${css.input} ${
                      errors.email && touched.email ? css.errorInput : ""
                    }`}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={css.errorMessage}
                  />
                </label>
                <label className={css.label}>
                  <span className={css.span}>Password</span>
                  <div className={css.passwordContainer}>
                    <Field
                      className={`${css.input} ${
                        errors.password && touched.password
                          ? css.errorInput
                          : ""
                      }`}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
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
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={css.errorMessage}
                  />
                </label>

                <button
                  className={css.button}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </Form>
            )}
          </Formik>
          <div className={css.footerContent}>
            <p className={css.text}>
              Or sign in with{" "}
              <button>
                <div className={css.googleStyle}>
                  <span className={css.g}>G</span>
                  <span className={css.o}>o</span>
                  <span className={css.o2}>o</span>
                  <span className={css.g2}>g</span>
                  <span className={css.l}>l</span>
                  <span className={css.e}>e</span>
                </div>
              </button>
            </p>
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

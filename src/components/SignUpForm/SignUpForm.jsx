import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { register } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";

import icons from "../../assets/icons/icons.svg";
import s from "./SignUpForm.module.css";

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

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

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const requestData = { ...values }; 
    delete requestData.repeatPassword;

    dispatch(register(requestData))
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
    setShowPassword(!showPassword);
  };

  const togglePasswordRVisibility = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={s.container}>
        <div className={s.content}>
          <h2 className={s.title}>Sign Up</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className={s.form} autoComplete="off">
                <label className={s.label}>
                  <span className={s.span}>Email</span>
                  <Field
                    className={`${s.input} ${
                      errors.email && touched.email ? s.errorInput : ""
                    }`}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={s.errorMessage}
                  />
                </label>

                <label className={s.label}>
                  <span className={s.span}>Password</span>
                  <div className={s.passwordContainer}>
                    <Field
                      className={`${s.input} ${
                        errors.password && touched.password ? s.errorInput : ""
                      }`}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="password"
                    />
                    <button
                      type="button"
                      className={s.toggleButton}
                      onClick={togglePasswordVisibility}
                      aria-label="Toggle password visibility"
                    >
                      <svg className={s.icon}>
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
                    className={s.errorMessage}
                  />
                </label>

                <label className={s.label}>
                  <span className={s.span}>Repeat password</span>
                  <div className={s.passwordContainer}>
                    <Field
                      className={`${s.input} ${
                        errors.repeatPassword && touched.repeatPassword
                          ? s.errorInput
                          : ""
                      }`}
                      type={showPasswordRepeat ? "text" : "password"}
                      name="repeatPassword"
                      placeholder="Repeat password"
                      autoComplete="repeatPassword"
                    />
                    <button
                      type="button"
                      className={s.toggleButton}
                      onClick={togglePasswordRVisibility}
                      aria-label="Toggle password visibility"
                    >
                      <svg className={s.icon}>
                        <use
                          href={`${icons}#${
                            showPasswordRepeat ? "icon-view" : "icon-hide"
                          }`}
                        />
                      </svg>
                    </button>
                  </div>
                  <ErrorMessage
                    name="repeatPassword"
                    component="div"
                    className={s.errorMessage}
                  />
                </label>

                <button
                  className={s.button}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sing up
                </button>
              </Form>
            )}
          </Formik>
          <div className={s.footerContent}>
            <p className={s.text}>
              Already have account?{" "}
              <NavLink to="/signin" className={s.link} type="submit">
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

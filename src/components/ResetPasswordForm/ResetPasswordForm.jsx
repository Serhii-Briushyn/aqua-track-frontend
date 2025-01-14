import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { resetPassword } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";

import icons from "../../assets/icons/icons.svg";
import ccs from "./ResetPasswordForm.module.css";

const initialValues = {
  password: "",
  repeatPassword: "",
};

const validationSchema = Yup.object({
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

  const fullToken = new URLSearchParams(location.search).get("token");
  const token = fullToken?.split("token=")[1] || fullToken;

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(resetPassword({ token, newPassword: values.password }))
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
      <div className={ccs.container}>
        <div className={ccs.content}>
          <h2 className={ccs.title}>Reset Password</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className={ccs.form} autoComplete="off">
                <label className={ccs.label}>
                  <span className={ccs.span}>New password</span>
                  <div className={ccs.passwordContainer}>
                    <Field
                      className={`${ccs.input} ${
                        errors.password && touched.password
                          ? ccs.errorInput
                          : ""
                      }`}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="password"
                    />
                    <button
                      type="button"
                      className={ccs.toggleButton}
                      onClick={togglePasswordVisibility}
                      aria-label="Toggle password visibility"
                    >
                      <svg className={ccs.icon}>
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
                    className={ccs.errorMessage}
                  />
                </label>

                <label className={ccs.label}>
                  <span className={ccs.span}>Repeat password</span>
                  <div className={ccs.passwordContainer}>
                    <Field
                      className={`${ccs.input} ${
                        errors.repeatPassword && touched.repeatPassword
                          ? ccs.errorInput
                          : ""
                      }`}
                      type={showPasswordRepeat ? "text" : "password"}
                      name="repeatPassword"
                      placeholder="Repeat password"
                      autoComplete="repeatPassword"
                    />
                    <button
                      type="button"
                      className={ccs.toggleButton}
                      onClick={togglePasswordRVisibility}
                      aria-label="Toggle password visibility"
                    >
                      <svg className={ccs.icon}>
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
                    className={ccs.errorMessage}
                  />
                </label>

                <button
                  className={ccs.button}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Confirm
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;

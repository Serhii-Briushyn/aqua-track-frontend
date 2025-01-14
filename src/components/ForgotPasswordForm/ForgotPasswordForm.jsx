import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { forgotPassword } from "../../redux/auth/operations.js";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import Loader from "../Loader/Loader.jsx";

import css from "./ForgotPasswordForm.module.css";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(forgotPassword(values))
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

  return (
    <>
      {isLoading && <Loader />}
      <div className={css.container}>
        <div className={css.content}>
          <h2 className={css.title}>Forget Password</h2>
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

                <button
                  className={css.button}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Reset
                </button>
              </Form>
            )}
          </Formik>
          <div className={css.footerContent}>
            <p className={css.text}>
              Don&apos;t have an account?{" "}
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

export default ForgotPasswordForm;

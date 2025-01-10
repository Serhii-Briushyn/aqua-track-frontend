import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import s from "./SignUpForm.module.css";
import { useState } from "react";
import icons from "../../assets/icons/icons.svg";
import Logo from "../Logo/Logo";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
// import { useDispatch } from "react-redux";
// import { register } from "../../redux/auth/operations";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, options) => {
    if (!values.email || !values.password || !values.password) {
      return console.log("hello");
    }
    dispatch(register(values));
    options.resetForm();
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const togglePasswordRVisibility = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };
  return (
    <div>
      <div className={s.signin_wrapper}>
        <Logo />
        <div className={s.signin_form}>
          <h2 className={s.title}>Sign Up</h2>
          <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            <Form className={s.form}>
              <ul className={s.list}>
                <li>
                  <label className={s.label}>
                    Email
                    <Field
                      name="email"
                      type="email"
                      className={s.input}
                      placeholder="Enter your email"
                    />
                  </label>
                </li>
                <li>
                  <label className={`${s.password} ${s.label}`}>
                    Password
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={`${s.password} ${s.input}`}
                      placeholder="Enter your password"
                    />
                    <svg className={s.icon} onClick={togglePasswordVisibility}>
                      <use
                        href={`${icons}#${
                          showPassword ? "icon-view" : "icon-hide"
                        }`}
                      />
                    </svg>
                  </label>
                </li>
                <li>
                  <label className={`${s.password} ${s.label}`}>
                    Repeat password
                    <Field
                      name="repeat"
                      type={showPasswordRepeat ? "text" : "password"}
                      className={`${s.password} ${s.input}`}
                      placeholder="Repeat password"
                    />
                    <svg className={s.icon} onClick={togglePasswordRVisibility}>
                      <use
                        href={`${icons}#${
                          showPasswordRepeat ? "icon-view" : "icon-hide"
                        }`}
                      />
                    </svg>
                  </label>
                </li>
              </ul>
              <button className={s.btn} type="submit">
                Sing up
              </button>
              <div className={s.no_account}>
                <p className={s.text}>Already have account?</p>
                <Link to="/signin" className={s.link} type="submit">
                  Sign In
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

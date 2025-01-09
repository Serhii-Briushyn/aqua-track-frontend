// import { useDispatch } from "react-redux"
// import { login } from "../../redux/auth/operations"
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import s from "./SignInForm.module.css";
import { useState } from "react";
import icons from "../../assets/icons/icons.svg";
import Logo from "../Logo/Logo";

const SignInForm = () => {
  //   const dispatch = useDispatch()

  // const initialValues = {
  //   email: '',
  //   password: '',
  // }

  // const handleSubmit = (values, options) => {
  //   if (!values.email || !values.password) {
  //     return "oops"
  //   }
  //     dispatch(login(values))
  //     options.resetForm()
  // }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.signin_wrapper}>
      <Logo />
      <div className={s.signin_form}>
        <h2 className={s.title}>Sign In</h2>
        <Formik>
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
            </ul>
            <button className={s.btn} type="submit">
              Sing in
            </button>
            <div className={s.no_account}>
              <p className={s.text}>Don’t have an account?</p>
              <Link to="/signup" className={s.link} type="submit">
                Sign Up
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default SignInForm;

// __________OPERATIONS___________//
// import { createAsyncThunk } from "@reduxjs/toolkit";

// import axios from "axios";

// export const aquaTrackApi = axios.create({
//   baseURL: "",
// });

// export const setAuthHeader = (token) => {
//   aquaTrackApi.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const clearAuthHeader = () => {
//   aquaTrackApi.defaults.headers.common.Authorization = "";
// };

// //____________________________SIGNIN___________________________________//

// export const login = createAsyncThunk(
//   "auth/signin",
//   async (credentials, thunkApi) => {
//     try {
//       const { data } = await aquaTrackApi.post("/users/signin", credentials);
//       setAuthHeader(data.token);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

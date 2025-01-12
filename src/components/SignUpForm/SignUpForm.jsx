/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import s from "./SignUpForm.module.css";
import { useState } from "react";
import icons from "../../assets/icons/icons.svg";
import { useDispatch, useSelector } from "react-redux";
import { register as signUp } from "../../redux/auth/operations";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { selectIsLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const isLoading = useSelector(selectIsLoading);

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const { repeatPassword, ...filteredData } = data;
    const response = await dispatch(signUp(filteredData));
    response.payload === "ConflictError" && toast.error("Email in use!");
    response.ok && reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordRVisibility = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };
  return (
    <div>
      {isLoading && <Loader />}
      <div className={s.signup_wrapper}>
        <div className={s.signup_form}>
          <h2 className={s.title}>Sign Up</h2>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className={s.form}>
              <ul className={s.list}>
                <li>
                  <label className={s.label}>
                    Email
                    <input
                      name="email"
                      type="email"
                      {...register("email")}
                      className={
                        errors.email?.message ? s.input_error : s.input
                      }
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className={s.errors}>{errors.email.message}</p>
                    )}
                  </label>
                </li>
                <li>
                  <label className={`${s.password} ${s.label}`}>
                    Password
                    <div className={s.input_wrapper}>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className={
                          errors.password?.message ? s.input_error : s.input
                        }
                        placeholder="Enter your password"
                      />
                      <svg
                        className={s.icon}
                        onClick={togglePasswordVisibility}
                      >
                        <use
                          href={`${icons}#${
                            showPassword ? "icon-view" : "icon-hide"
                          }`}
                        />
                      </svg>
                    </div>
                    {errors.password && (
                      <p className={s.errors}>{errors.password.message}</p>
                    )}
                  </label>
                </li>
                <li>
                  <label className={`${s.password} ${s.label}`}>
                    Repeat password
                    <div className={s.input_wrapper}>
                      <input
                        name="repeat"
                        type={showPasswordRepeat ? "text" : "password"}
                        {...register("repeatPassword")}
                        className={
                          errors.repeatPassword?.message
                            ? s.input_error
                            : s.input
                        }
                        placeholder="Repeat password"
                      />
                      <svg
                        className={s.icon}
                        onClick={togglePasswordRVisibility}
                      >
                        <use
                          href={`${icons}#${
                            showPasswordRepeat ? "icon-view" : "icon-hide"
                          }`}
                        />
                      </svg>
                    </div>
                    {errors.repeatPassword && (
                      <p className={s.errors}>
                        {errors.repeatPassword.message}
                      </p>
                    )}
                  </label>
                </li>
              </ul>
              <button className={s.btn} type="submit">
                Sing up
              </button>
            </div>
          </form>
          <div className={s.no_account}>
            <p className={s.text}>Already have account?</p>
            <Link to="/signin" className={s.link} type="submit">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUpForm;

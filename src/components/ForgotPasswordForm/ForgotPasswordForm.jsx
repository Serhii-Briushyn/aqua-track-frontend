import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { forgotPassword } from "../../redux/auth/operations.js";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import Loader from "../Loader/Loader.jsx";

import css from "./ForgotPasswordForm.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";

const ForgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    try {
      const response = await dispatch(forgotPassword(values)).unwrap();
      toast.success(response.message || "Reset link sent to your email!");
      reset();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={css.container}>
        <div className={css.content}>
          <h2 className={css.title}>Forget Password</h2>
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

            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Reset"}
            </button>
          </form>
          <div className={css.footerContent}>
            <p className={css.text}>
              Don&apos;t have an account?{" "}
              <NavLink to="/signin" className={css.link}>
                Sign In
              </NavLink>
            </p>
          </div>
        </div>
        <LanguageSwitcher />
      </div>
    </>
  );
};

export default ForgotPasswordForm;

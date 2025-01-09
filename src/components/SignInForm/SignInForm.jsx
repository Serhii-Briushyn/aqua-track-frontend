import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/operations.js";
import { useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { selectAuthError } from "../../redux/auth/selectors.js";

const signInFormSchema = Yup.object({
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
  const reduxError = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const loginResult = await dispatch(login({ email, password }));
      if (login.fulfilled.match(loginResult)) {
        navigate("/tracker");
        reset();
      } else {
        toast.error("Failed to login, please sign up");
      }
    } catch (error) {
      toast.error("Failed to login: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
};

export default SignInForm;

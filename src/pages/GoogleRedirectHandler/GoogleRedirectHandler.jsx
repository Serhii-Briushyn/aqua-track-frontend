import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { loginWithGoogle } from "../../redux/auth/operations";
import Loader from "../../components/Loader/Loader";

const GoogleRedirectHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (code) {
        try {
          await dispatch(loginWithGoogle(code)).unwrap();
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.error("Authorization code missing");
      }
    };
    handleGoogleLogin();
  }, [dispatch]);

  return <Loader />;
};

export default GoogleRedirectHandler;

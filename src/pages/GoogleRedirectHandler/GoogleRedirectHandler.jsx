import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { loginWithGoogle } from "../../redux/auth/operations";
import Loader from "../../components/Loader/Loader";
import { aquaTrackApi } from "../../services/apiClient";

const GoogleRedirectHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (code) {
        try {
          const response = await dispatch(loginWithGoogle(code)).unwrap();

          const accessToken = response.data.data.accessToken;

          localStorage.setItem("accessToken", accessToken);

          aquaTrackApi.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
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

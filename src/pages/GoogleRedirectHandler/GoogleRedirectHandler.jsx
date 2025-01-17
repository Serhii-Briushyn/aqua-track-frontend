import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginWithGoogle } from "../../redux/auth/operations";
import Loader from "../../components/Loader/Loader";
import { aquaTrackApi } from "../../services/apiClient";

const GoogleRedirectHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (code) {
        try {
          const response = await dispatch(loginWithGoogle(code)).unwrap();

          aquaTrackApi.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.data.accessToken}`;
          navigate("/tracker");
        } catch (error) {
          toast.error(error);
          navigate("/signin");
        }
      } else {
        toast.error("Authorization code missing");
        navigate("/signin");
      }
    };
    handleGoogleLogin();
  }, [dispatch, navigate]);

  return <Loader />;
};

export default GoogleRedirectHandler;

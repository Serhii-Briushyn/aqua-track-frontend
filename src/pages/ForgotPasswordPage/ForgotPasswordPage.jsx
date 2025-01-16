import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

import DocumentTitle from "../../components/DocumentTitle.jsx";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import ForgetPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm.jsx";
import { fadeInScale } from "../../motion/motion.js";

export default function ForgetPasswordPage() {
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  return (
    <>
      <DocumentTitle>Reset</DocumentTitle>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeInScale()}
      >
        <ForgetPasswordForm />
      </motion.div>

      {isLargeScreen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeInScale()}
        >
          <AdvantagesSection />
        </motion.div>
      )}
    </>
  );
}

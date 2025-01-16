import { motion } from "framer-motion";

import DocumentTitle from "../../components/DocumentTitle.jsx";
import { useMediaQuery } from "@mui/material";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm.jsx";
import { fadeInScale } from "../../motion/motion.js";

export default function ResetPasswordPage() {
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
        <ResetPasswordForm />
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

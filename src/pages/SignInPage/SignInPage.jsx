import { motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";

import DocumentTitle from "../../components/DocumentTitle.jsx";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import SignInForm from "../../components/SignInForm/SignInForm";
import { fadeInScale } from "../../motion/motion.js";

export default function SignInPage() {
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  return (
    <>
      <DocumentTitle>Sign In</DocumentTitle>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeInScale()}
      >
        <SignInForm />
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

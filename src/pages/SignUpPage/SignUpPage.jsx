import { motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";

import DocumentTitle from "../../components/DocumentTitle";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { fadeInScale } from "../../motion/motion.js";

export default function SignUpPage() {
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  return (
    <>
      <DocumentTitle>SignUp</DocumentTitle>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeInScale()}
      >
        <SignUpForm />
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

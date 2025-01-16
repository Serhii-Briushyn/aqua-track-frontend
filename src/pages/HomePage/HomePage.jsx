import { motion } from "framer-motion";

import DocumentTitle from "../../components/DocumentTitle";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import { fadeInScale } from "../../motion/motion.js";

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Welcome</DocumentTitle>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeInScale()}
      >
        <WelcomeSection />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeInScale()}
      >
        <AdvantagesSection />
      </motion.div>
    </>
  );
}

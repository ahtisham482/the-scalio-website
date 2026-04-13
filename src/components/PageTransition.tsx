import { motion } from "framer-motion";
import { useEffect } from "react";

const ease = [0.16, 1, 0.3, 1];

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

import { motion } from "framer-motion";
import { MdPeopleAlt } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";

export const TopStatus = () => {
  return (
    <div className="status">
      <motion.p
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.6 }}
      >
        <RiMoonFill size={14} color="#FAA61A" />
        <span>Server is updating</span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.6, delay: 0.3 }}
      >
        <MdPeopleAlt size={16} color="#72767D" />
        <span>3/1000</span>
      </motion.p>
    </div>
  );
};

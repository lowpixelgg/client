import { motion } from "framer-motion";
import { MdPeopleAlt } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";
import { useContext } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";

export const TopStatus = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;

  return (
    <div className="status">
      <motion.p
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.6 }}
      >
        <RiMoonFill size={14} color="#FAA61A" />
        <span>{langObj.Main[0]}</span>
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

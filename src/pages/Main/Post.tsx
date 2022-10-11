import { motion } from "framer-motion";
import PostImage from "@/assets/images/iniciojornada2.png";
import { RiExternalLinkLine } from "react-icons/ri";
import CheckIcon from "@/assets/icons/Check.svg";
import { Button } from "@/components/Button";
import { useContext } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";

export const Post = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;

  return (
    <motion.div
      className="post"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeIn", duration: 0.4 }}
    >
      <h1 className="post--title">
        <img src={CheckIcon} style={{ width: 14 }} />
        <span>Newswire:</span>
      </h1>

      <img className="post--image" src={PostImage} />

      <p className="post--desc">{langObj.Main[1]}</p>

      <Button className="post--button" active>
        <span>{langObj.Main[2]}</span>
        <RiExternalLinkLine size={16} />
      </Button>
    </motion.div>
  );
};

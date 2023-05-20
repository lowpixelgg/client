import { motion } from "framer-motion";
import { RiExternalLinkLine } from "react-icons/ri";
import CheckIcon from "@/assets/icons/Check.svg";
import { Button } from "@/components/Button";
import { useContext, useState, useEffect } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";
import { NewsWire } from '@/global/NewsWire';

export const Post = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;
  const [image, setImage] = useState(NewsWire[0]);
  const [imageKey, setImageKey] = useState(0);
  const [text, setText] = useState(langObj.Main[1][0])

  const handlechangeimage = () => {
    if (imageKey >= NewsWire.length - 1) {
      setImageKey(0);
      setImage(NewsWire[0]);
      setText(langObj.Main[1][0])
    } else {
      setImageKey(imageKey + 1);
      setImage(NewsWire[imageKey + 1]);
      setText(langObj.Main[1][imageKey + 1])
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      handlechangeimage();
    }, 5000);
    return () => clearInterval(interval);
    
  }, [imageKey]);

  return (
    <motion.div
      className="post"
      key={image}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 0.3}}
    >
      <h1 className="post--title">
        <img src={CheckIcon} style={{ width: 14 }} />
        <span>Newswire:</span>
      </h1>

      <motion.img
        className="post--image" src={image} 
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.4 }}

      />

      <motion.p
        className="post--desc"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.4 }}
      >
        {text}
      </motion.p>

      <Button className="post--button" active>
        <span>{langObj.Main[2]}</span>
        <RiExternalLinkLine size={16} />
      </Button>
    </motion.div>
  );
};

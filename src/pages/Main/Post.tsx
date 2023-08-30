import { motion } from "framer-motion";
import { RiExternalLinkLine } from "react-icons/ri";
import CheckIcon from "@/assets/icons/Check.svg";
import { Button } from "@/components/Button";
import { useContext, useState, useEffect } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";
import { NewsWire } from '@/global/NewsWire';
import { shell } from "electron";

export const Post = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;
  const [image, setImage] = useState(NewsWire[0]);
  const [imageKey, setImageKey] = useState(0);
  const [text, setText] = useState(langObj.Main[1][0])



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

      <img id="frame" width="550" height="285" src="https://cdn.discordapp.com/attachments/1072690267049709699/1142107690886250506/preview.png" ></img>

      <motion.p
        className="post--desc"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.4 }}
      >
      Cada vez mais perto de seu lançamento, a agora disponibiliza seu espaço para um evento de testes, onde você poderá conhecer nosso mapa e desfrutar dessa experiência que fará parte do comum na sua rotina daqui um tempinho! Com quase 2 anos de desenvolvimento, ficamos muito felizes em apresentar parte dos resultados que estão por vir. Aproveite sua estadia!]
      </motion.p>

      <Button className="post--button" onClick={() => { shell.openExternal("https://www.youtube.com/live/SYAoaoTEAHo?si=tY1CVoTXi2BJAjsz")}} active>
        <span>Ver no Youtube</span>
        <RiExternalLinkLine size={16} />
      </Button>
    </motion.div>
  );
};

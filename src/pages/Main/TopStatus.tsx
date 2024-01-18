import { motion } from "framer-motion";
import { MdPeopleAlt } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";
import { SocketContext } from "@/contexts/socket";
import { Socket } from "socket.io-client";

export const TopStatus = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;
  const socket = useContext(SocketContext) as Socket;
  const [players, setPlayers] = useState<string | undefined>()

  useEffect(() => {
    setInterval(() => {
      socket.emit("getQuery", (data: any) => {
        setPlayers(`${data.players}/${data.maxplayers}`)
      })
    }, 1000)
  }, [])
  


  return (
    <div className="status">
      <motion.p
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.6 }}
      >
        <HiStatusOnline size={14} color="#149129" />
        <span>{langObj.Main[0]}</span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.6, delay: 0.3 }}
      >
        <MdPeopleAlt size={16} color="#72767D" />
        {players ? (<span>{players}</span>) : <span>Aguardando</span>}
      </motion.p>
    </div>
  );
};

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TbDownload } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { Button } from "@/components/Button";
import { useContext } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";
import { SocketContext } from "@/contexts/socket";
import { Socket } from "socket.io-client";
import { ipcRenderer } from "electron";

interface Download {
  percent: number;
  string: string;
}

export const Download = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;

  const [action, setActionButton] = useState<String | null>();
  const [download, setDownload] = useState<Download | null>();
  const socket = useContext(SocketContext) as Socket;

  useEffect(() => {
    socket.emit("checkForUpdates", (state: string) => {
      setActionButton(state);
    });

    socket.on("onUpdaterProgress", (data: Download) => {
      setDownload(data);
    });
  }, [socket]);

  return (
    <div className="download">
      {download && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeIn", duration: 0.4 }}
            className="downloadBar"
          >
            <span className="downloadBar--bar">
              <strong
                className="downloadBar--percent"
                style={{ left: `${download.percent}%` }}
              >
                {Math.floor(download.percent)}%
              </strong>

              <span
                className="downloadBar--fill"
                style={{ width: `${download.percent}%` }}
              />

              <p
                className="downloadBar--icon"
                style={{ left: `${download.percent}%` }}
              >
                🎉
              </p>
            </span>

            <p className="downloadBar--status">{download.string}</p>
          </motion.div>
        </AnimatePresence>
      )}

      {action && (
        <Button
          active={download ? false : true}
          disabled={download ? true : false}
          className="download--action"
          onClick={() => socket.emit(action as string)}
        >
          <span>
            {action == 'ClientNeedsDownloadContent' && langObj.Main[3]}
            {action == 'ClientNeedsDownloadUpdates' && langObj.Main[5]}
            {action == 'ClientReadyToPlay' && langObj.Main[6]}
          </span>
          {action === langObj.Main[6] ? (
            <FaPlay size={16} color="#f8f9fa" />
          ) : (
            <TbDownload size={20} color="#f8f9fa" />
          )}
        </Button>
      )}
    </div>
  );
};

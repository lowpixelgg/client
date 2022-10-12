import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TbDownload } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { Button } from "@/components/Button";
import { useContext } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";

export const Download = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;

  const [actionBtn, setActionBtn] = useState(langObj.Main[3]);
  const [downloadFill, setDownloadFill] = useState(0);

  const handleAction = () => {
    switch (actionBtn) {
      case langObj.Main[3]:
        setActionBtn(langObj.Main[4]);

        let init = downloadFill;
        const timer = setInterval(() => {
          if (init < 100) {
            setDownloadFill(init + 1);
            init++;
          } else {
            clearInterval(timer);
            setDownloadFill(0);
            setActionBtn(langObj.Main[5]);
          }
        }, 100);
        break;

      case langObj.Main[5]:
        setActionBtn(langObj.Main[6]);
        break;

      default:
        break;
    }
  };

  return (
    <div className="download">
      <AnimatePresence>
        {actionBtn !== langObj.Main[6] && (
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
                style={{ left: `${downloadFill}%` }}
              >
                {downloadFill}%
              </strong>

              <span
                className="downloadBar--fill"
                style={{ width: `${downloadFill}%` }}
              />

              <p
                className="downloadBar--icon"
                style={{ left: `${downloadFill}%` }}
              >
                🎉
              </p>
            </span>

            <p className="downloadBar--status">1,6/2GB 10MB/s</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        active={actionBtn !== langObj.Main[4]}
        disabled={actionBtn === langObj.Main[4]}
        className="download--action"
        onClick={() => handleAction()}
      >
        <span>{actionBtn}</span>
        {actionBtn === langObj.Main[6] ? (
          <FaPlay size={16} color="#f8f9fa" />
        ) : (
          <TbDownload size={20} color="#f8f9fa" />
        )}
      </Button>
    </div>
  );
};

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TbDownload } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { Button } from "@/components/Button";

export const Download = () => {
  const [actionBtn, setActionBtn] = useState("baixar");
  const [downloadFill, setDownloadFill] = useState(0);

  const handleAction = () => {
    switch (actionBtn) {
      case "baixar":
        setActionBtn("baixando");

        let init = downloadFill;
        const timer = setInterval(() => {
          if (init < 100) {
            setDownloadFill(init + 1);
            init++;
          } else {
            clearInterval(timer);
            setDownloadFill(0);
            setActionBtn("Update");
          }
        }, 100);
        break;

      case "Update":
        setActionBtn("Jogar");
        break;

      default:
        break;
    }
  };

  return (
    <div className="download">
      <AnimatePresence>
        {actionBtn !== "Jogar" && (
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
        active={actionBtn !== "baixando"}
        disabled={actionBtn === "baixando"}
        className="download--action"
        onClick={() => handleAction()}
      >
        <span>{actionBtn}</span>
        {actionBtn === "Jogar" ? (
          <FaPlay size={16} color="#f8f9fa" />
        ) : (
          <TbDownload size={20} color="#f8f9fa" />
        )}
      </Button>
    </div>
  );
};

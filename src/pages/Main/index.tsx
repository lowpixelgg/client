import { Container } from "./styles";
import {
  RiMoonFill,
  RiExternalLinkLine,
  RiSettings3Fill,
} from "react-icons/ri";
import { MdPeopleAlt, MdVerified } from "react-icons/md";
import { BsLink, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";
import { TbDownload } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { Button } from "@/components/Button";
import { motion, AnimatePresence } from "framer-motion";
import PostImage from "@/assets/images/iniciojornada2.png";
import AvatarImg from "@/assets/images/avatar1.png";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export const Main = () => {
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
        }, 300);
        break;

      case "Update":
        setActionBtn("Jogar");
        break;

      default:
        break;
    }
  };

  return (
    <Container>
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

      <div className="main">
        <motion.div
          className="post"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 0.4 }}
        >
          <h1 className="post--title">
            <MdVerified size={20} color="#3BA55C" />
            <span>Newswire:</span>
          </h1>

          <img className="post--image" src={PostImage} />

          <p className="post--desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem....
          </p>

          <Button className="post--button" active>
            <span>Continuar Lendo</span>
            <RiExternalLinkLine size={18} />
          </Button>
        </motion.div>

        <div className="sidebar">
          <div className="avatar">
            <img src={AvatarImg} />

            <span style={{ background: "#3BA55C" }} />
          </div>

          <motion.nav
            exit={{ opacity: 0.4 }}
            transition={{ ease: "easeIn", duration: 0.4 }}
          >
            <motion.button
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.4 }}
            >
              <RiSettings3Fill className="icon--settings" size={22} />
            </motion.button>

            <span className="line" />

            <motion.button
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.4, delay: 0.1 }}
            >
              <BsLink
                className="icon--link"
                size={22}
                style={{ margin: "-4px 0" }}
              />
            </motion.button>

            <motion.button
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.4, delay: 0.2 }}
            >
              <BsTwitter className="icon--twitter" size={18} />
            </motion.button>

            <motion.button
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.4, delay: 0.3 }}
            >
              <BsInstagram className="icon--insta" size={18} />
            </motion.button>

            <motion.button
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.4, delay: 0.4 }}
            >
              <BsYoutube className="icon--youtube" size={18} />
            </motion.button>

            <motion.button
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.4, delay: 0.5 }}
            >
              <SiDiscord className="icon--discord" size={20} />
            </motion.button>
          </motion.nav>
        </div>
      </div>

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

      <Footer />
    </Container>
  );
};

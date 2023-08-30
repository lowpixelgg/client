import { RiSettings3Fill } from "react-icons/ri";
import { BsLink, BsTwitch, BsInstagram, BsYoutube } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";
import { motion } from "framer-motion";
import { shell } from "electron";
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { Avatar } from "../Avatar";

export const SideNav = () => {
  const redirect = (url: string) => {
    shell.openExternal(url);
  };
  const navigate = useNavigate();

  return (
    <Container className="sideNav">
      <Avatar />

      <motion.nav
        exit={{ opacity: 0.4 }}
        transition={{ ease: "easeIn", duration: 0.4 }}
      >
        <motion.button
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.4 }}
          // onClick={() => navigate("/settings/account")}
        >
          <RiSettings3Fill className="icon--settings" size={18} />
        </motion.button>

        <span className="line" />

        <motion.button
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.4, delay: 0.1 }}
          onClick={() => redirect("https://linktr.ee/rocketroleplay")}
        >
          <BsLink
            className="icon--link"
            size={18}
            style={{ margin: "-4px 0" }}
          />
        </motion.button>

        <motion.button
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.4, delay: 0.2 }}
          onClick={() => redirect("https://www.twitch.tv/rocketmta")}
        >
          <BsTwitch className="icon--twitch" size={16} />
        </motion.button>

        <motion.button
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.4, delay: 0.3 }}
          onClick={() => redirect("https://www.instagram.com/rocketrp/")}
        >
          <BsInstagram className="icon--insta" size={14} />
        </motion.button>

        <motion.button
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.4, delay: 0.4 }}
          onClick={() =>
            redirect("https://www.youtube.com/channel/UCyza1JKr5tnfC7VPvkXkGHA")
          }
        >
          <BsYoutube className="icon--youtube" size={14} />
        </motion.button>

        <motion.button
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.4, delay: 0.5 }}
          onClick={() => redirect("https://discord.gg/rocketrp")}
        >
          <SiDiscord className="icon--discord" size={16} />
        </motion.button>
      </motion.nav>
    </Container>
  );
};

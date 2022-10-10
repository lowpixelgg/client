import { motion } from "framer-motion";
import PostImage from "@/assets/images/rocket_newswireilegalxlegal.png";
import { RiExternalLinkLine } from "react-icons/ri";
import CheckIcon from "@/assets/icons/Check.svg";
import { Button } from "@/components/Button";

export const Post = () => {
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

      <p className="post--desc">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting.
      </p>

      <Button className="post--button" active>
        <span>Continuar Lendo</span>
        <RiExternalLinkLine size={16} />
      </Button>
    </motion.div>
  );
};

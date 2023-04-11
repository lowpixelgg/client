import { useContext } from "react";
import { Container } from "./styles";
import { Input } from "../../components/Input/index";
import { Button } from "../../components/Button/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";
import AuthContext from "@/global/AuthContext";
import { useEffect } from "react";

export const Login = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;

  const [email, setEmail] = useState(""); 
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const {signIn, VerifyAuthetication, user}  = useContext(AuthContext);
  const navigate = useNavigate();

  const buttonAction = async () => {
    setLoading(true);
    await signIn(email, pass);
    setLoading(false)
    // if (email && pass) {
    //   navigate("/init");
    // }

    // setLoading(false);
  };

  useEffect(() => {
    VerifyAuthetication();
  }, [])

  return (
    <Container>
      <motion.div
        id="logo"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.6 }}
      />

      <motion.div
        id="login"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.6, delay: 0.2 }}
      >
        <Input
          masked={false}
          placeholder={langObj.Login[0]}
          focus={email.length ? true : false}
          icon="user"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            return setEmail(e.target.value);
          }}
        />

        <Input
          masked={true}
          placeholder={langObj.Login[1]}
          focus={pass.length ? true : false}
          icon="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            return setPass(e.target.value);
          }}
        />

        <Button
          loading={loading}
          active={email.length > 0 && pass.length > 0}
          onClick={() => buttonAction()}
        >
          {langObj.Login[2]}
        </Button>

        <div className="forgotPass">
          <a href="/">
            {langObj.Login[3]}
            <span> {langObj.Login[4]}</span>
          </a>
        </div>

        <div className="createAccount">
          <a href="/">
            {langObj.Login[5]}
            <span>{langObj.Login[6]}</span>
          </a>
        </div>
      </motion.div>

      <motion.div
        id="right-content"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.6, delay: 0.2 }}
      >
        <img className="rectangle_union" src="./src/assets/Union.png" />
        <img className="rectangle_border" src="./src/assets/rectangle.png" />
        <img className="rectangle_image" src="./src/assets/rectangle_img.png" />
      </motion.div>

      <Footer />
    </Container>
  );
};

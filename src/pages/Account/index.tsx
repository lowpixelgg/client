import { Avatar } from "@/components/Avatar";
import { Container } from "./styles";
import { GrTurbolinux } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { useContext } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";

export const Account = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;

  return (
    <Container className="avatar">
      <div className="head">
        <h1>{langObj.Account[0]}</h1>
        <p>{langObj.Account[1]}</p>
      </div>

      <div className="userContainer">
        <div className="userContainer--banner" />

        <div className="userContainer--head">
          <div className="left">
            <Avatar />

            <div className="name">
              <h3>Flashii</h3>

              <span>
                <GrTurbolinux size={14} color="#5764EE" />
              </span>
            </div>
          </div>

          <button>{langObj.Account[2]}</button>
        </div>

        <div className="userContainer--infos">
          <div className="row">
            <div className="left">
              <h3>{langObj.Account[3]}</h3>
              <p>flashii</p>
            </div>

            <button>
              <span>{langObj.Account[4]}</span>
              <AiFillEdit size={16} />
            </button>
          </div>

          <div className="row">
            <div className="left">
              <h3>{langObj.Account[5]}</h3>
              <p>****************@gmail.com</p>
            </div>

            <button>
              <span>{langObj.Account[4]}</span>
              <AiFillEdit size={16} />
            </button>
          </div>

          <div className="row">
            <div className="left">
              <h3>{langObj.Account[6]}</h3>
              <p>***************9981</p>
            </div>

            <button>
              <span>{langObj.Account[4]}</span>
              <AiFillEdit size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="auth">
        <h1>{langObj.Account[7]}</h1>

        <div>
          <button>
            <span>{langObj.Account[8]}</span>
            <BiLinkExternal size={16} />
          </button>

          <button>{langObj.Account[9]}</button>
        </div>

        <p>{langObj.Account[10]}</p>
      </div>
    </Container>
  );
};

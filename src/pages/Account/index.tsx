import { Avatar } from "@/components/Avatar";
import { Container } from "./styles";
import { GrTurbolinux } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";

export const Account = () => {
  return (
    <Container className="avatar">
      <div className="head">
        <h1>Minha conta:</h1>
        <p>Veja suas informações pessoais, e altere algumas.</p>
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

          <button>Editar perfil de usuário</button>
        </div>

        <div className="userContainer--infos">
          <div className="row">
            <div className="left">
              <h3>NOME DE USUÀRIO</h3>
              <p>flashii</p>
            </div>

            <button>
              <span>Editar</span>
              <AiFillEdit size={16} />
            </button>
          </div>

          <div className="row">
            <div className="left">
              <h3>E-MAIL</h3>
              <p>****************@gmail.com</p>
            </div>

            <button>
              <span>Editar</span>
              <AiFillEdit size={16} />
            </button>
          </div>

          <div className="row">
            <div className="left">
              <h3>TELEFONE</h3>
              <p>***************9981</p>
            </div>

            <button>
              <span>Editar</span>
              <AiFillEdit size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="auth">
        <h1>Senha e autenticação</h1>

        <div>
          <button>
            <span>Mudar minha senha</span>
            <BiLinkExternal size={16} />
          </button>

          <button>CONFIGURAR V2E</button>
        </div>

        <p>
          Tip: Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic t
        </p>
      </div>
    </Container>
  );
};

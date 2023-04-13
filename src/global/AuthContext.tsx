import { createContext, useState } from "react";
import { api } from "@/services/apiClient";
import * as ls from "@/utils/localstorageSlim";
import { AxiosError } from "axios";
import * as toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type GlobalMessage = {
  success?: any;
  global: string;
  description: string;
};

interface AuthContextData {
  user: object | null;
  setUser: React.Dispatch<React.SetStateAction<object | null>>;
  VerifyAuthetication: () => Promise<void>;
  signOut : () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  create: (data: RegisterData) => Promise<void>;
  activate: (token: string) => Promise<GlobalMessage>;
  recovery: (token: string, password: string) => Promise<void>;
  signInWithGoogle: (token: string) => Promise<void>;
  sendRecoveryEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export async function signOut() {
  ls.removeItem("saturn-api.token");
  return (window.location.href = "/");
}

export async function pageDown() {
  return (window.location.href = "/offPage")
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<object | null>(null);

  async function signIn(email: string, password: string): Promise<void> {
    try {
      const { data } = await api.get("/account/authenticate", {
        auth: {
          username: email,
          password: password,
        },
      });

      const token = data.body.token;

      ls.set("saturn-api.token", token);

      return navigate("/init");
    } catch (err) {
      const { response } = err as AxiosError;

      switch (response?.status) {
        case 401:
          return toast.error("Senha e/ou email inválidos.");
        case 403:
          return toast.error(
            "Sem permissão, verifique seu e-mail. nós enviamos um novo token de ativação."
          );
        case 404:
          return toast.warn("Este usuário ainda não foi cadastrado.");
        default:
          return toast.error("Problema ao completar esta ação.");
      }
    }
  }
  
  async function VerifyAuthetication() {
    const token = ls.get("saturn-api.token");
    if(!token) return;
    try {
      const { data } = await api.get("/account");
      if(data.body.userid){
        return navigate("/init");
      }
     
    } catch (err) {
      ls.removeItem("saturn-api.token");
    }
  }

//   async function signInWithGoogle(token: string) {
//     try {
//       const { data } = await api.post("/account/authenticate/social/google", {
//         token
//       });

//       ls.set("saturn-api.token", data.body.token);
//       return navigate("/home");
//     } catch (err) {
//       const { response } = err as AxiosError;

//       switch (response?.status) {
//         case 401:
//           return toast.error("Senha e/ou email inválidos.");
//         case 404:
//           return toast.warn("Este usuário ainda não foi cadastrado.");
//         default:
//           return toast.error("Problema ao completar esta ação.");
//       }
//     }
//   }

  

//   async function create(data: RegisterData): Promise<void> {
//     try {
//       await api.post("/account/register", data);

//       return navigate("/register/confirm", { replace: true });
//     } catch (err) {
//       const { response } = err as AxiosError;

//       switch (response?.status) {
//         case 409:
//           return toast.error("Este e-mail ou username já foram utilizados.");
//         default:
//           return toast.error("Problema ao completar esta ação.");
//       }
//     }
//   }

//   async function activate(token: string) {
//     try {
//       await api.patch("/account/activate/" + token);

//       return {
//         success: true,
//         global: "Seu e-mail foi confirmado com sucesso",
//         description:
//           "Parabéns!! Sua conta acaba de ser verificada com sucesso na Rocket, finalmente você já pode fazer sua whitelist e aguardar os proximo spassos para iniciar sua vida na cidade.",
//       };
//     } catch (err) {
//       const { response } = err as AxiosError;

//       switch (response?.status) {
//         case 400:
//           return {
//             global: "Token de ativação já usado ou expirado",
//             description:
//               "Parece que o token de ativação que você está tentando usar já expirou ou já foi usado, se nenhuma das opções entre em contato com o suporte.",
//           };

//         case 404:
//           return {
//             global: "Token de ativação não encontrado",
//             description:
//               "Infelizmente nós não fomos capazes de encontrar o seu token de ativação em nosso sistema, se o problema persisitir entre em contato com o suporte.",
//           };

//         default:
//           return {
//             global: "Problemas na confirmação",
//             description:
//               "Parece que ocorreu um erro ao confirmar seu e-mail, por favor verifique se o link enviado bate com a URL caso contrario contate o suporte.",
//           };
//       }
//     }
//   }

//   async function sendRecoveryEmail(email: string) {
//     try {
//       await api.get("/account/recovery/send/" + email);

//       return navigate("/recovery/sent");
//     } catch (err) {
//       const { response } = err as AxiosError;

//       switch (response?.status) {
//         case 404:
//           return toast.error(
//             "Parece que este usuario ainda não foi registrado."
//           );
//         default:
//           return toast.error("Problema ao completar esta ação.");
//       }
//     }
//   }

//   async function recovery(token: string, password: string): Promise<void> {
//     try {
//       await api.post("/account/recovery/change/" + token, { password });

//       toast.success(
//         "Sua senha foi alterada com sucesso, você já pode fazer login Plataforma"
//       );

//       return navigate("/login");
//     } catch (err) {
//       const { response } = err as AxiosError;
//       switch (response?.status) {
//         case 404:
//           return toast.error("Este token de recuperação não foi encontrado.");
//         case 400:
//           return toast.error(
//             "Este token de recuperação já exipirou ou é inválido."
//           );
//         default:
//           return toast.error("Problema ao completar esta ação.");
//       }
//     }
//   }

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        VerifyAuthetication,
        setUser,
        signIn,
        // create,
        // activate,
        // recovery,
        // signInWithGoogle,
        // sendRecoveryEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
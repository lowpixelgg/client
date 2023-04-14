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

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        VerifyAuthetication,
        setUser,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
import { Container } from "./styles";
import { CustomSlider } from "@/components/Slider";
import DirectionsImg from "@/assets/images/groupDirection.svg";
import { TextField } from "@mui/material";
import { CustomSelect } from "@/components/Select";

export const Mta = () => {
  return (
    <Container>
      <div className="head">
        <h1>Multi Theft Auto</h1>
        <p>
          Que tal mudar como seu jogo se comporta? Use as configurações abaixo
          para obter a melhor experencia com o servidor.
        </p>
      </div>

      <div className="ram">
        <div className="sliders">
          <div className="row">
            <CustomSlider label="MAXIMO DE RAM" />
          </div>

          <div className="row">
            <CustomSlider label="MINIMO DE RAM" />
          </div>
        </div>

        <div className="values">
          <p>4GB</p>

          <p>2GB</p>
        </div>

        <img className="directions" src={DirectionsImg} />

        <div className="var">
          <label>VARIAÇÃO DE USO:</label>
          <p>3,62GB</p>
        </div>
      </div>

      <p className="tip">
        TIP: Nós recomendamos fortemente que você deixe sempre o máximo e a
        minima iguais ou muito perto, usar uma variação muito grande de uso pode
        afetar o carregamento e execução de alguns sistemas importantes.
      </p>

      <div className="install">
        <h1>Arquivos e instalação</h1>
        <p>
          Antes de baixar ou até mesmo se seu HD estiver cheio de arquivos você
          pode mudar o local de instalação da Rocket, mas CUIDADO alterar a sua
          pasta e não mudar a localização poderá afetar seu jogo.
        </p>
        <div>
          <CustomInput />
          <button>Alterar Local</button>
        </div>
      </div>

      <div className="comp">
        <label>COMPORTAMENTO</label>
        <CustomSelect Items={["Sempre minimizar quando abrir"]} />
        <CustomSelect Items={["Use Ubershaders para carregamento"]} />
      </div>
    </Container>
  );
};

const CustomInput = () => {
  return (
    <TextField
      defaultValue="C:\Windows\apppatch\Custom\Custom64\Multi.exe"
      sx={{
        width: "100%",
        background: "#141414",
        "& .MuiInputBase-root": { color: "#f8f9fa" },
        "& .MuiInputBase-input": { padding: "8px 14px", fontSize: "0.875em" },
        "&:hover .MuiOutlinedInput-notchedOutline, .Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#f8f8fa61",
          },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#202225",
        },
      }}
    />
  );
};

import { CustomSelect } from "@/components/Select";
import { CustomSlider } from "@/components/Slider";
import { Container } from "./styles";

export const Graphics = () => {
  return (
    <Container>
      <div className="head">
        <h1>Vídeo e gráficos</h1>
        <p>
          Vamos configurar os seus gráficos, por que jogar lagando é uma droga!
          Todas as configurações abaixo são aplicadas quando você inicia o jogo.
        </p>
      </div>

      <div className="row sizes">
        <div className="col">
          <label>RESOLUÇÃO</label>
          <CustomSelect Items={["1600x900x32"]} />
        </div>

        <div className="col">
          <label>COMPORTAMENTO</label>
          <CustomSelect Items={["Tela cheia em janela"]} />
        </div>

        <div className="col">
          <label>PROPORÇÃO</label>
          <CustomSelect Items={["4:3"]} />
        </div>
      </div>

      <div className="row slider">
        <CustomSlider label="BRILHO" />
      </div>

      <h1>Gráficos do jogo</h1>

      <div className="row slider">
        <CustomSlider label="DISTANCIA DO HORIZONTE" />
      </div>

      <div className="row options">
        <div className="col">
          <label>VSYNC</label>
          <CustomSelect Items={["OFF"]} />
        </div>

        <div className="col">
          <label>ANTI SERRILHAMENTO</label>
          <CustomSelect Items={["3X"]} />
        </div>

        <div className="col">
          <label>MOTION BLUR</label>
          <CustomSelect Items={["OFF"]} />
        </div>
      </div>

      <div className="row options">
        <div className="col">
          <label>TEXTURAS</label>
          <CustomSelect Items={["ULTRA"]} />
        </div>

        <div className="col">
          <label>
            <p>CARREGAMENTO DE ROUPAS DO CJ</p>
          </label>
          <CustomSelect Items={["RÀPIDO"]} />
        </div>

        <div className="col">
          <label>SHADERS</label>
          <CustomSelect Items={["LOW"]} />
        </div>
      </div>
    </Container>
  );
};

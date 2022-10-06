import { Slider } from "@mui/material";
import { Container } from "./styles";
import { CustomSlider } from "@/components/Slider";
import { CustomSelect } from "@/components/Select";

export const Voice = () => {
  return (
    <Container>
      <div className="head">
        <h1>Configuração de voz</h1>
        <p>Configure seu microfone e aplico efeitos de ruido ou outros.</p>
      </div>

      <div className="row">
        <div className="col">
          <label>DISPOSITIVO DE ENTRADA</label>
          <CustomSelect
            Items={[
              "VoiceMeeter Output (VB-Audio- VoiceMe)",
              "VoiceMeeter Output (VB-Audio- VoiceMe)",
            ]}
          />
        </div>

        <div className="col">
          <label>DISPOSITIVO DE SAÍDA</label>
          <CustomSelect Items={["VoiceMeeter Input (VB-Audio- VoiceMee)"]} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <CustomSlider label="VOLUME DE ENTRADA" />
        </div>

        <div className="col">
          <CustomSlider label="VOLUME DE SAÌDA" />
        </div>
      </div>

      <div className="row mic">
        <label>TESTAR MICROFONE</label>

        <p>
          Está tendo problemas com o microfone? Cante alguma coisa em seu
          dispositivo, se nós conseguirmos ouvir reproduziremos com a barra
          abaixo.
        </p>

        <MicSlider />
      </div>

      <h1>Efeitos de voz</h1>

      <div className="row">
        <div className="col">
          <label>SUPRESSÃO DE RUIDOS</label>
          <CustomSelect Items={["Sem supressão"]} />
        </div>

        <div className="col">
          <label>FILTRO DE RUIDOS</label>
          <CustomSelect Items={["OpenCoded"]} />
        </div>
      </div>
    </Container>
  );
};

const MicSlider = () => {
  return (
    <Slider
      defaultValue={20}
      disabled
      sx={{
        height: 6,
        "& .MuiSlider-track": {
          background: "#57cc99",
        },
        "& .MuiSlider-rail": { background: "#4F545C" },
        "& 	.MuiSlider-thumb": {
          display: "none",
        },
        "& .MuiSlider-thumb:hover, .Mui-focusVisible": {
          boxShadow: "none",
        },
      }}
    />
  );
};

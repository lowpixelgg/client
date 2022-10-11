import { Slider } from "@mui/material";
import { Container } from "./styles";
import { CustomSlider } from "@/components/Slider";
import { CustomSelect } from "@/components/Select";
import { useContext } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";

export const Voice = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;

  return (
    <Container>
      <div className="head">
        <h1>{langObj.Voice[0]}</h1>
        <p>{langObj.Voice[1]}</p>
      </div>

      <div className="row">
        <div className="col">
          <label>{langObj.Voice[2]}</label>
          <CustomSelect
            Items={[
              "VoiceMeeter Output (VB-Audio- VoiceMe)",
              "VoiceMeeter Output (VB-Audio- VoiceMe)",
            ]}
          />
        </div>

        <div className="col">
          <label>{langObj.Voice[3]}</label>
          <CustomSelect Items={["VoiceMeeter Input (VB-Audio- VoiceMee)"]} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <CustomSlider label={langObj.Voice[4]} />
        </div>

        <div className="col">
          <CustomSlider label={langObj.Voice[5]} />
        </div>
      </div>

      <div className="row mic">
        <h1>{langObj.Voice[6]}</h1>

        <p>{langObj.Voice[7]}</p>

        <MicSlider />
      </div>

      <h1>{langObj.Voice[8]}</h1>

      <div className="row">
        <div className="col">
          <label>{langObj.Voice[9]}</label>
          <CustomSelect Items={["Sem supressão"]} />
        </div>

        <div className="col">
          <label>{langObj.Voice[10]}</label>
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

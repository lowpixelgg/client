import { CustomSelect } from "@/components/Select";
import { CustomSlider } from "@/components/Slider";
import { Container } from "./styles";
import { useContext } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";

export const Graphics = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;

  return (
    <Container>
      <div className="head">
        <h1>{langObj.Graphics[0]}</h1>
        <p>{langObj.Graphics[1]}</p>
      </div>

      <div className="row sizes">
        <div className="col">
          <label>{langObj.Graphics[2]}</label>
          <CustomSelect Items={[...langObj.Graphics[3]]} />
        </div>

        <div className="col">
          <label>{langObj.Graphics[4]}</label>
          <CustomSelect Items={[...langObj.Graphics[5]]} />
        </div>

        <div className="col">
          <label>{langObj.Graphics[6]}</label>
          <CustomSelect Items={[...langObj.Graphics[7]]} />
        </div>
      </div>

      <div className="row slider">
        <CustomSlider label={langObj.Graphics[8].toString()} />
      </div>

      <h1>Gráficos do jogo</h1>

      <div className="row slider">
        <CustomSlider label={langObj.Graphics[9].toString()} />
      </div>

      <div className="row options">
        <div className="col">
          <label>{langObj.Graphics[10]}</label>
          <CustomSelect Items={[...langObj.Graphics[11]]} />
        </div>

        <div className="col">
          <label>{langObj.Graphics[12]}</label>
          <CustomSelect Items={[...langObj.Graphics[13]]} />
        </div>

        <div className="col">
          <label>{langObj.Graphics[14]}</label>
          <CustomSelect Items={[...langObj.Graphics[15]]} />
        </div>
      </div>

      <div className="row options">
        <div className="col">
          <label>{langObj.Graphics[16]}</label>
          <CustomSelect Items={[...langObj.Graphics[17]]} />
        </div>

        <div className="col">
          <label>
            <p>{langObj.Graphics[18]}</p>
          </label>
          <CustomSelect Items={[...langObj.Graphics[19]]} />
        </div>

        <div className="col">
          <label>{langObj.Graphics[20]}</label>
          <CustomSelect Items={[...langObj.Graphics[21]]} />
        </div>
      </div>
    </Container>
  );
};

import { Container } from "./styles";
import { CustomSlider } from "@/components/Slider";
import DirectionsImg from "@/assets/images/groupDirection.svg";
import { TextField } from "@mui/material";
import { CustomSelect } from "@/components/Select";
import { useContext } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";
import { Link } from "react-router-dom";

export const Mta = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;

  return (
    <Container>
      <div className="head">
        <h1>{langObj.MTA[0]}</h1>
        <p>{langObj.MTA[1]}</p>
      </div>

      <div className="ram">
        <div className="sliders">
          <div className="row">
            <CustomSlider label={langObj.MTA[2].toString()} />
          </div>

          <div className="row">
            <CustomSlider label={langObj.MTA[3].toString()} />
          </div>
        </div>

        <div className="values">
          <p>4GB</p>

          <p>2GB</p>
        </div>

        <img className="directions" src={DirectionsImg} />

        <div className="var">
          <label>{langObj.MTA[4]}</label>
          <p>3,62GB</p>
        </div>
      </div>

      <p className="tip">
        {langObj.MTA[5]}{" "}
      </p>

      <div className="install">
        <h1>{langObj.MTA[6]}</h1>
        <p>{langObj.MTA[7]}</p>
        <div>
          <CustomInput />
          <button>{langObj.MTA[8]}</button>
        </div>
      </div>

      <div className="comp">
        <label>{langObj.MTA[9]}</label>
        <CustomSelect Items={[...langObj.MTA[10]]} />
        <CustomSelect Items={[...langObj.MTA[11]]} />
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

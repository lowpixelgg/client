import { MenuItem, Select } from "@mui/material";
import { Container, CustomMuiStyles } from "./styles";

import BrazilFlag from "../../assets/icons/brazil.png";
import EuaFlag from "../../assets/icons/united-states.png";
import PortugalFlag from "../../assets/icons/portugal.png";
import SpainFlag from "../../assets/icons/spain.png";
import RussiaFlag from "../../assets/icons/russia.png";
import TurkeyFlag from "../../assets/icons/turkey.png";
import { useContext } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";

const LanguageOptions = [
  {
    image: BrazilFlag,
    lang: "Português",
    country: "Brazil",
    set: "br",
  },
  {
    image: PortugalFlag,
    lang: "Português",
    country: "Portugal",
    set: "pt",
  },
  {
    image: EuaFlag,
    lang: "English",
    country: "United States",
    set: "eng",
  },
  {
    image: SpainFlag,
    lang: "Español",
    country: "España",
    set: "es",
  },
  {
    image: RussiaFlag,
    lang: "Русский",
    country: "Россия",
    set: "rus",
  },
  {
    image: TurkeyFlag,
    lang: "Türkçe",
    country: "Türkiye",
    set: "tur",
  },
];

export const Language = () => {
  const { langObj } = useContext(LanguageContext) as LangContextTypes;

  return (
    <Container>
      <div className="head">
        <h1>{langObj.Language[0]}</h1>
        <p>{langObj.Language[1]}</p>
      </div>

      <div className="row">
        <CustomSelect />
      </div>

      <CustomMuiStyles />
    </Container>
  );
};

const CustomSelect = () => {
  return (
    <Select
      defaultValue={"br"}
      onChange={(e) => console.log(e.target.value)}
      sx={{
        width: "100%",
        background: "#2F3136",
        color: "#f8f8fa",
        fontSize: ".875em",
        "& .MuiSelect-select": { padding: "8px 12px" },
        "& .MuiSelect-icon": { color: "#f8f8fa" },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#f8f8fa61",
        },
        "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline":
          { borderColor: "#202225" },
      }}
    >
      {LanguageOptions.map((item, index) => {
        return (
          <MenuItem value={item.set} key={index}>
            <div className="languageItem">
              <img src={item.image} />

              <div>
                <strong>{item.lang}</strong>
                <p>{item.country}</p>
              </div>
            </div>
          </MenuItem>
        );
      })}
    </Select>
  );
};

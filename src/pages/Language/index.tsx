import {
  Backdrop,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Container, CustomMuiStyles } from "./styles";

import BrazilFlag from "../../assets/icons/brazil.png";
import EuaFlag from "../../assets/icons/united-states.png";
import PortugalFlag from "../../assets/icons/portugal.png";
import SpainFlag from "../../assets/icons/spain.png";
import RussiaFlag from "../../assets/icons/russia.png";
import TurkeyFlag from "../../assets/icons/turkey.png";
import { useContext, useState } from "react";
import { LangContextTypes, LanguageContext } from "@/global/LanguageContext";
import LanguageJson from "@/global/Language.json";

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
  const { langObj, setLanguage, language } = useContext(
    LanguageContext
  ) as LangContextTypes;
  const [[isSaveLang, isChangingLang, Lang], setFeedback] = useState([
    false,
    false,
    "",
  ]);

  const ChangeLang = (lang: string) => {
    if (lang !== language) {
      setFeedback([true, false, lang]);
    } else {
      setFeedback([false, false, ""]);
    }
  };

  const handleSaveLang = () => {
    setFeedback([true, true, Lang]);

    let timer = setTimeout(() => {
      setLanguage(Lang);
      setFeedback([false, false, ""]);
      clearTimeout(timer);
    }, 2000);
  };

  return (
    <Container>
      <div className="head">
        <h1>{langObj.Language[0]}</h1>
        <p>{langObj.Language[1]}</p>
      </div>

      <div className="row">
        <CustomSelect ChangeLang={ChangeLang} language={language} />
      </div>

      {isSaveLang && (
        <button onClick={handleSaveLang} className="changeAction">
          Salvar
        </button>
      )}

      <Backdrop open={isChangingLang}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <CustomMuiStyles />
    </Container>
  );
};

type CustomSelectProps = {
  ChangeLang: (lang: string) => void;
  language: string;
};

const CustomSelect = ({ ChangeLang, language }: CustomSelectProps) => {
  const handleSelectLang = (e: SelectChangeEvent) => {
    const suportLangs = Object.keys(LanguageJson);

    if (suportLangs.includes(e.target.value)) {
      ChangeLang(e.target.value);
    } else {
      ChangeLang(language);
    }
  };

  return (
    <Select
      defaultValue={language}
      onChange={handleSelectLang}
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

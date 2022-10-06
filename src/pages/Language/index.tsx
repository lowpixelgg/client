import { MenuItem, Select } from "@mui/material";
import { Container, CustomMuiStyles } from "./styles";

import BrazilFlag from "../../assets/icons/brazil.png";
import EuaFlag from "../../assets/icons/united-states.png";
import PortugalFlag from "../../assets/icons/portugal.png";
import SpainFlag from "../../assets/icons/spain.png";
import RussiaFlag from "../../assets/icons/russia.png";
import TurkeyFlag from "../../assets/icons/turkey.png";

export const Language = () => {
  return (
    <Container>
      <div className="head">
        <h1>Idioma</h1>
        <p>
          Use seu idioma de preferencia, lembrando que estas configurações serão
          atualizadas no jogo também, então tome cuidado.
        </p>
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
      defaultValue={0}
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
      <MenuItem value={0}>
        <div className="languageItem">
          <img src={BrazilFlag} />

          <div>
            <strong>Português</strong>
            <p>Brasil</p>
          </div>
        </div>
      </MenuItem>

      <MenuItem value={1}>
        <div className="languageItem">
          <img src={EuaFlag} />

          <div>
            <strong>Inglês</strong>
            <p>Estados Unidos</p>
          </div>
        </div>
      </MenuItem>

      <MenuItem value={2}>
        <div className="languageItem">
          <img src={SpainFlag} />

          <div>
            <strong>Espanhol</strong>
            <p>Espanha</p>
          </div>
        </div>
      </MenuItem>

      <MenuItem value={3}>
        <div className="languageItem">
          <img src={RussiaFlag} />

          <div>
            <strong>Russo</strong>
            <p>Rússia</p>
          </div>
        </div>
      </MenuItem>

      <MenuItem value={4}>
        <div className="languageItem">
          <img src={TurkeyFlag} />

          <div>
            <strong>Turco</strong>
            <p>Turquia</p>
          </div>
        </div>
      </MenuItem>
    </Select>
  );
};

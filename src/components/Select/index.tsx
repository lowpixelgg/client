import { MenuItem, Select } from "@mui/material";

type CustomSelectProps = {
  Items: string[];
};

export const CustomSelect = ({ Items }: CustomSelectProps) => {
  return (
    <Select
      defaultValue={0}
      sx={{
        width: "100%",
        background: "#141414",
        color: "#f8f8fa",
        fontSize: "0.75em",
        "& .MuiSelect-select": { padding: "10px 14px" },
        "& .MuiSelect-icon": { color: "#f8f8fa" },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#f8f8fa61",
        },
        "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline":
          { borderColor: "#202225" },
      }}
    >
      {Items.map((item, index) => {
        return (
          <MenuItem value={index} key={index}>
            <span>{item}</span>
          </MenuItem>
        );
      })}
    </Select>
  );
};

import { Slider } from "@mui/material";

type CustomSliderProps = {
  label: string;
};

export const CustomSlider = ({ label }: CustomSliderProps) => {
  return (
    <>
      <label>{label}</label>

      <Slider
        defaultValue={60}
        sx={{
          height: 6,
          "& .MuiSlider-track": {
            background: "#5865F2",
            border: "none",
          },
          "& .MuiSlider-rail": { background: "#4F545C" },
          "& 	.MuiSlider-thumb": {
            width: 12,
            height: 24,
            background: "#f8f8fa",
            borderRadius: "4px",
          },
        }}
      />
    </>
  );
};

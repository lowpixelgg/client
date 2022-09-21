import { Container } from "./styles";
import { CircularProgress } from '@mui/material';
import { HtmlHTMLAttributes } from "react";


type ButtonProps = {
  loading?: boolean;
  active?: boolean;
  onClick: any;
}

export const Button = ({ loading = false, active = false, onClick, ...rest }: ButtonProps & HtmlHTMLAttributes<HTMLInputElement>) => {
  return (
    <Container>
      <div className={`box ${active && 'active'}`}>
        <button  onClick={onClick} type="submit">
          {loading ? <CircularProgress size={20} sx={{color: 'white'}}/> : rest.children }
        </button>
      </div>
    </Container>
  );
};
import { HtmlHTMLAttributes, HTMLInputTypeAttribute, ReactNode, useState } from "react";
import { Container } from "./styles";
import { FaUserAlt } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa"

type InputProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  masked: boolean;
  focus?: boolean;
  disabled?: boolean;
  icon?: "user" | "password" | ReactNode;
}

export const Input = ({ id, icon, placeholder, focus, disabled, masked, ...rest }: InputProps & HtmlHTMLAttributes<HTMLInputElement>) => {
  return (
    <Container>
      <div className={`box ${icon && "icon"} ${focus && "active" }`}>
        {icon === "user" ? (
            <FaUserAlt  size={14} />
          ) : icon === "password" ? (
            <FaUnlock size={14} />
          ) : (
            icon
        )}

        <input 
          {...rest}
          type={masked ? "password": "text" }
          name="nome"
          id={id}
          placeholder={placeholder} 
          disabled={disabled} 
        />
      </div>
    </Container>
  );
};
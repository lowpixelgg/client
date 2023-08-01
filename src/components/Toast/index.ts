import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import React from "react";
import { toast, Slide } from "react-toastify";

export const error = (e: string) => {
  toast.error(e, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    transition: Slide,
    draggable: true,
    icon: false,
    
    progress: undefined,
    theme: "colored",
  });
};

export const success = (e: string) => {
  toast.success(e, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: false,
    transition: Slide,
    progress: undefined,
    theme: "colored",
  });
};

export const info = (e: string) => {
  toast.info(e, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: false,
    transition: Slide,
    progress: undefined,
    theme: "colored",
  });
};

export const warn = (e: string) => {
  toast.warning(e, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    transition: Slide,
    draggable: true,
    icon: false,
    progress: undefined,
    theme: "colored",
  });
};
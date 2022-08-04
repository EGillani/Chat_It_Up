import { createTheme } from "@mui/material/styles";
export default createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    "common": { "black": "#000", "white": "#fff" },
    "background": { "paper": "#fff", "default": "#fafafa" },
    "primary": {
      "light": "rgba(184, 233, 134, 1)",
      "main": "rgba(90, 148, 26, 1)",
      "dark": "rgba(65, 117, 5, 1)",
      "contrastText": "#fff"
    },
    "secondary": {
      "light": "#ff4081",
      "main": "#f50057",
      "dark": "#c51162",
      "contrastText": "#fff"
    },
    "error": {
      "light": "#e57373",
      "main": "#f44336",
      "dark": "#d32f2f",
      "contrastText": "#fff"
    },
    "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.38)",
      "hint": "rgba(0, 0, 0, 0.38)"
    }
  },
});

// palette: {
//   common: { black: "#000", white: "rgba(245, 0, 0, 1)" },
//   background: { paper: "rgba(255, 255, 255, 1)", default: "#fafafa" },
//   primary: {
//     light: "rgba(189, 16, 224, 1)",
//     main: "rgba(181, 63, 158, 1)",
//     dark: "rgba(144, 19, 254, 1)",
//     contrastText: "#fff",
//   },
//   secondary: {
//     light: "rgba(126, 211, 33, 1)",
//     main: "rgba(0, 198, 101, 0.4)",
//     dark: "rgba(65, 117, 5, 1)",
//     contrastText: "#fff",
//   },
//   error: {
//     light: "#e57373",
//     main: "rgba(244, 67, 54, 0.55)",
//     dark: "#d32f2f",
//     contrastText: "#fff",
//   },
//   text: {
//     primary: "rgba(0, 0, 0, 0.87)",
//     secondary: "rgba(0, 0, 0, 0.54)",
//     disabled: "rgba(0, 0, 0, 0.38)",
//     hint: "rgba(0, 0, 0, 0.38)",
//   },
// },

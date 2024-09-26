import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GlobalStyle } from "./components/commons/Global.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyle /> 
    {/* adds global style to the page */}
    <App />
  </StrictMode>
);

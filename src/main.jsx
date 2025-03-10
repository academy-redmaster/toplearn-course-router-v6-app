import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "remixicon/fonts/remixicon.css";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <App />
      </NextThemesProvider>
    </HeroUIProvider>
  </BrowserRouter>
);

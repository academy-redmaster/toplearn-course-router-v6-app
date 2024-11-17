import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import "remixicon/fonts/remixicon.css";
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <App />
    </NextThemesProvider>
  </NextUIProvider>
);

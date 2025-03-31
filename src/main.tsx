import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { AboutPage } from "./components/AboutPage.tsx";
import { sampleAboutData } from "./data/sampleAboutData.ts";
import "./index.css";
import "./styles/pixelArt.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage data={sampleAboutData} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

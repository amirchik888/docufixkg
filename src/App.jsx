import { Routes, Route } from "react-router-dom";
import "./styles/variables.css";
import { useState } from "react";

import Landing from "./pages/Landing/Landing";
import Welcome from "./pages/Welcome/Welcome";
import Category from "./pages/Category/Category";
import ProcessStudy from "./pages/ProcessStudy/ProcessStudy.jsx";
import ProcessWork from "./pages/ProcessWork/ProcessWork.jsx";

export default function App() {
  const savedLang = localStorage.getItem("lang");

  const [lang, setLang] = useState(
      savedLang === "KG" ? "KG" : "RU"
  );
  const setLangGlobal = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };
  return (

      <Routes>
        <Route path="/" element={<Landing lang={lang} setLang={setLangGlobal} />} />
        <Route path="/welcome" element={<Welcome lang={lang} setLang={setLangGlobal} />} />
        <Route path="/Category" element={<Category lang={lang} setLang={setLangGlobal} />} />
          <Route path="/process/study/:type" element={<ProcessStudy />} />
          <Route path="/process/work/:type" element={<ProcessWork />} />
      </Routes>
  );
}
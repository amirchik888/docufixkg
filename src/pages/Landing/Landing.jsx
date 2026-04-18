import Header from "../../components/Header/Header";
import AuthCard from "../../components/AuthCard/AuthCard";
import AIHighlights from "../../components/AIHighlights/AIHighlights";
import BackgroundPattern from "../../components/BackgroundPattern/BackgroundPattern";
import { useState } from "react";
import styles from "./Landing.module.css";

export default function Landing() {
    const [lang, setLang] = useState("RU");
    return (
        <div className={styles.page}>
            <BackgroundPattern />
            <Header lang={lang} setLang={setLang} />

            <main className={styles.main}>
                <AIHighlights />
                <AuthCard />
            </main>
        </div>
    );
}
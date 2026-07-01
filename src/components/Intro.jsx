import { useState, useEffect } from "react";
import "./Intro.css";

function Intro({ onFinish }) {
    const [exit, setExit] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setExit(true), 3600);
        const doneTimer = setTimeout(() => onFinish(), 4300);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(doneTimer);
        };
    }, [onFinish]);

    const word = "Veloure";

    return (
        <div className={`intro ${exit ? "intro-exit" : ""}`}>
            <div className="intro-inner">
                <h1 className="intro-logo">
                    {word.split("").map((letter, i) => (
                        <span
                            key={i}
                            className="intro-letter"
                            style={{ animationDelay: `${0.2 + i * 0.13}s` }}
                        >
                            {letter}
                        </span>
                    ))}
                    <span className="intro-shimmer" aria-hidden="true">
                        {word}
                    </span>
                </h1>
            </div>
        </div>
    );
}

export default Intro;
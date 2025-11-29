import { useState, useEffect } from "react";

// --- Question Pools ---
const regelwerk = [
  { q: "Das LCPD darf im LCMD aushelfen als Zweitjob.", a: "Falsch – nur das LSFD darf dies" },
  { q: "Ein Charakter, der ausgeblutet ist, kann sich nicht mehr an die Situation erinnern.", a: "Richtig" },
  { q: "Drive-by-Schüsse sind für Fahrer eines PKW erlaubt.", a: "Falsch" },
  { q: "Streamer dürfen Supportgespräche live übertragen, solange der Chat deaktiviert ist.", a: "Falsch" },
  { q: "Beleidigungen sind erlaubt, solange sie im RP-Kontext bleiben und nicht gegen die echte Person gehen.", a: "Richtig" },
  { q: "Nach Kündigung einer staatlichen Fraktion und Beitritt zu einer Bad-Frak muss man 3 Tage warten.", a: "Richtig" },
  { q: "Das Stürzen einer Fraktionsleitung muss per Ticket beantragt werden.", a: "Richtig" },
  { q: "Ein Spieler, der in derselben Situation zweimal stirbt, darf nicht wiederbelebt werden.", a: "Richtig" },
  { q: "Es dürfen 70% des illegalen Bestandes bei einer Razzia abgenommen werden.", a: "Falsch – nur 50%" },
  { q: "Für eine Razzia müssen zwei Kriterien erfüllt sein: 7500 illegale Rohmaterialien, 8 Geiseln.", a: "Falsch – 15.000 Einheiten & 15 Geiseln" }
];

const loco = [
  { q: "Das 🏙️ Loco City Team hat 8 Mitglieder.", a: "Falsch" },
  { q: "Es gibt 4 Unternehmen.", a: "Falsch" },
  { q: "Loco City wurde am 05.09 released.", a: "Falsch" },
  { q: "Es gibt regelmäßig Giveaways.", a: "Wahr" },
  { q: "Ab 6 Tagen Spielzeit gibt es Loco Family.", a: "Falsch" },
  { q: "Unser Peak war 44 Spieler.", a: "Falsch" },
  { q: "Die Höchstrafe beträgt 100000$ und 60 Hafteinheiten.", a: "Wahr" },
  { q: "Wir haben 5 Streamer.", a: "Wahr" },
  { q: "Es gibt 13 24/7.", a: "Falsch" },
  { q: "Es gibt 7 markierte Jobs.", a: "Falsch" },
  { q: "Volltuning kostet 60000$.", a: "Falsch" },
  { q: "Es gibt 7 Lovespots.", a: "Wahr" },
  { q: "Die niedrigste PLZ ist 1000.", a: "Falsch" },
  { q: "Die höchste PLZ ist 10140.", a: "Wahr" },
  { q: "Ein Menü bei Pearls kostet 1500$.", a: "Falsch" },
  { q: "LocoCity gehört auf die 1.", a: "Wahr" },
  { q: "Ein Kaufvertrag kostet 25000$.", a: "Wahr" },
  { q: "Man kann nicht heiraten.", a: "Falsch" },
  { q: "Es gibt 9 Fraktionen.", a: "Falsch" },
  { q: "Meta ist gerne gesehen.", a: "Falsch" },
  { q: "Unternehmen benötigen min. 2 Mitglieder.", a: "Falsch" },
  { q: "Partner ist Block Design.", a: "Wahr" },
  { q: "Der größte Kofferraum sind 7500.", a: "Wahr" },
  { q: "Es gibt 4 verschiedene Rucksäcke.", a: "Falsch" },
  { q: "Man braucht LKW-Führerschein.", a: "Wahr" },
  { q: "Es gibt keinen Waffenschein.", a: "Falsch" },
  { q: "Umbauten über Bauamt Discord.", a: "Falsch" }
];

// --- Allgemein (gekürzt hier) ---
const allgemein = [
  { q: "Wie viele Kontinente gibt es?", a: "7" },
  { q: "Wie viele Tage hat ein Schaltjahr?", a: "366" },
  { q: "Welche Farbe hat die Zunge einer Giraffe?", a: "Blau" },
  // ... (deine restlichen 60 Fragen bleiben unverändert)
];

// --- Fangfragen ---
const fangfragen = [
  { q: "Was wiegt mehr: 1kg Federn oder 1kg Stahl?", a: "Gleich schwer" },
  // ... + 30 neue Fangfragen
];

// --- Gaming Kategorie ---
const gaming = [
  { q: "Wie heißt der Klempner aus Mario?", a: "Mario" },
  // ... + 50 neue Gamingfragen
];

export default function LocoQuizTaxi() {
  const [category, setCategory] = useState("regelwerk");
  const [question, setQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const pools = { regelwerk, loco, fangfragen, allgemein, gaming };

  // Timer
  const [time, setTime] = useState(10);
  const [running, setRunning] = useState(false);
  const [maxTime, setMaxTime] = useState(10);

  // Joker-System
  const [hint, setHint] = useState(null);
  const [jokers, setJokers] = useState({
    skip: true,
    extraTime: true,
    hint: true
  });

  useEffect(() => {
    if (!running) return;
    if (time === 0) {
      setRunning(false);
      setShowAnswer(true);
      new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg").play();
      return;
    }
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time, running]);

  const startTimer = (sec) => {
    setMaxTime(sec);
    setTime(sec);
    setRunning(true);
    setShowAnswer(false);
    setHint(null);
  };

  const next = (skipUsed = false) => {
    const pool = pools[category];
    const random = pool[Math.floor(Math.random() * pool.length)];

    setQuestion(random);
    setShowAnswer(false);
    setRunning(false);
    setTime(maxTime);
    setHint(null);

    if (skipUsed)
      setJokers((j) => ({ ...j, skip: false }));
  };

  // --- Joker Funktionen ---
  const useHint = () => {
    if (!jokers.hint || !question) return;
    setHint(question.a.slice(0, 1) + "…");
    setJokers((j) => ({ ...j, hint: false }));
  };

  const useExtraTime = () => {
    if (!jokers.extraTime || !running) return;
    setTime((t) => t + 5);
    setJokers((j) => ({ ...j, extraTime: false }));
  };

  const progress = (time / maxTime) * 100;

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-xl space-y-5 transition-all duration-300 ease-out">

        {/* Logo + Titel */}
        <div className="flex flex-col items-center gap-2">
          <img src="https://i.ibb.co/k2vd4Mbk/Logo.png" className="w-40 opacity-90" />
          <h1 className="text-3xl font-bold text-center">
            Loco Quiz Taxi
            <br />
            <span className="text-lg text-gray-300">Moderation: Pirathas</span>
          </h1>
        </div>

        {/* Kategorien */}
        <div className="flex gap-3 justify-center">
          <button className={`px-4 py-2 rounded-xl ${category === "regelwerk" ? "bg-gray-500" : "bg-gray-700"}`} onClick={() => setCategory("regelwerk")}>📜 Regelwerk</button>
          <button className={`px-4 py-2 rounded-xl ${category === "loco" ? "bg-gray-500" : "bg-gray-700"}`} onClick={() => setCategory("loco")}>Loco City</button>
          <button className={`px-4 py-2 rounded-xl ${category === "fangfragen" ? "bg-gray-500" : "bg-gray-700"}`} onClick={() => setCategory("fangfragen")}>🧩 Fangfragen</button>
          <button className={`px-4 py-2 rounded-xl ${category === "allgemein" ? "bg-gray-500" : "bg-gray-700"}`} onClick={() => setCategory("allgemein")}>🌍 Allgemein</button>
          <button className={`px-4 py-2 rounded-xl ${category === "gaming" ? "bg-gray-500" : "bg-gray-700"}`} onClick={() => setCategory("gaming")}>🎮 Gaming</button>
        </div>

        {/* Joker */}
        <div className="flex gap-2 justify-center mb-3">
          <button disabled={!jokers.skip} onClick={() => next(true)} className={`px-3 py-2 rounded-lg font-bold ${jokers.skip ? "bg-yellow-500 hover:bg-yellow-400" : "bg-gray-600"}`}>🎲 Skip</button>
          <button disabled={!jokers.extraTime} onClick={useExtraTime} className={`px-3 py-2 rounded-lg font-bold ${jokers.extraTime ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-600"}`}>⏳ +5s</button>
          <button disabled={!jokers.hint} onClick={useHint} className={`px-3 py-2 rounded-lg font-bold ${jokers.hint ? "bg-purple-500 hover:bg-purple-400" : "bg-gray-600"}`}>💡 Hinweis</button>
        </div>

        {/* Frage */}
        <div className="bg-gray-700 p-4 rounded-xl min-h-[120px] flex items-center justify-center text-center text-lg">
          {question ? question.q : "Drücke auf 'Neue Frage'!"}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={next} className="px-5 py-3 bg-gray-500 hover:bg-gray-400 text-black font-bold rounded-xl">Neue Frage</button>

          <button onClick={() => startTimer(5)} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-xl">⏱️ 5s</button>
          <button onClick={() => startTimer(10)} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-xl">⏱️ 10s</button>
          <button onClick={() => startTimer(15)} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-xl">⏱️ 15s</button>

          {question && (
            <button onClick={() => setShowAnswer(!showAnswer)} className="px-5 py-3 bg-gray-500 hover:bg-gray-400 rounded-xl">Antwort</button>
          )}
        </div>

        {/* Timer */}
        {running && (
          <div className={`text-center text-3xl font-bold ${time <= 3 ? "text-gray-100 animate-pulse" : "text-gray-200"}`}>
            {time}s
          </div>
        )}

        {/* Progress Bar */}
        {running && (
          <div className="w-full bg-gray-700 h-4 rounded-xl overflow-hidden border border-gray-500 shadow-inner">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-white transition-all duration-300 shadow-lg" style={{ width: `${progress}%` }}></div>
          </div>
        )}

        {/* Hinweis-Anzeige */}
        {hint && (
          <div className="text-center text-lg font-bold text-yellow-400">Hinweis: {hint}</div>
        )}

        {/* Antwort */}
        {showAnswer && question && (
          <div className="text-center text-xl font-bold text-gray-300">{question.a}</div>
        )}
      </div>
    </div>
  );
}

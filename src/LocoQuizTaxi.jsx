import { useState, useEffect } from "react";

export default function LocoQuizTaxi() {
  // ----------------------- Question Pools -----------------------
  const regelwerk = [
    { q: "Das LCPD darf im LCMD aushelfen.", a: "Falsch – nur das LSFD darf das." },
    { q: "Ein Charakter der ausgeblutet ist, kann sich nicht erinnern.", a: "Richtig" },
    { q: "Drive-By Schüsse für PKW Fahrer sind erlaubt.", a: "Falsch" },
    { q: "Streamer dürfen Supportgespräche live übertragen.", a: "Falsch" },
    { q: "Beleidigungen sind erlaubt im RP-Kontext.", a: "Richtig" },
    { q: "Nach einer Staatskündigung → 3 Tage Wartezeit für Badfraks.", a: "Richtig" },
    { q: "Das Stürzen einer Leitung muss per Ticket beantragt werden.", a: "Richtig" },
    { q: "Zweimal sterben = nicht mehr wiederbelebbar.", a: "Richtig" },
    { q: "Es dürfen 70% des illegalen Bestands abgenommen werden.", a: "Falsch – 50%" },
    { q: "Für eine Razzia braucht man 7.500 Einheiten & 8 Geiseln.", a: "Falsch – 15.000 & 15 Geiseln" }
  ];

  const loco = [
    { q: "Das Loco City Team hat 8 Mitglieder.", a: "Falsch" },
    { q: "Es gibt 4 Unternehmen.", a: "Falsch – 7" },
    { q: "Loco City wurde am 05.09 released.", a: "Falsch – 06.09" },
    { q: "Es gibt regelmäßig Giveaways.", a: "Richtig" },
    { q: "Ab 6 Tagen Spielzeit gibt es Loco Family.", a: "Falsch – 7 Tage" },
    { q: "Peak: 44 Spieler.", a: "Falsch – 72" },
    { q: "Höchstrafe: 100.000$ + 60 Hafteinheiten.", a: "Richtig" },
    { q: "Wir haben 5 Streamer.", a: "Richtig" },
    { q: "Es gibt 13 24/7.", a: "Falsch – 18" },
    { q: "7 Jobmarkierungen.", a: "Falsch – 6" }
  ];

  const allgemein = [
    { q: "Wie viele Kontinente gibt es?", a: "7" },
    { q: "Wie viele Tage hat ein Schaltjahr?", a: "366" },
    { q: "Welche Farbe hat die Zunge einer Giraffe?", a: "Blau" },
    { q: "Größtes Tier der Welt?", a: "Blauwal" },
    { q: "Wie viele Zähne hat ein Erwachsener?", a: "32" }
  ];

  const fangfragen = [
    { q: "Was wiegt mehr? 1kg Federn oder 1kg Stahl?", a: "Gleich schwer" },
    { q: "Wie viele Monate haben 28 Tage?", a: "Alle" },
    { q: "Womit beginnt Nacht und endet Tag?", a: "Mit T" },
    { q: "Wenn du den Zweiten überholst, welchen Platz hast du?", a: "2." },
    { q: "Was wird nasser, je mehr es trocknet?", a: "Handtuch" }
  ];

  const pools = { regelwerk, loco, allgemein, fangfragen };

  // ----------------------- States -----------------------
  const [category, setCategory] = useState("regelwerk");
  const [question, setQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const [time, setTime] = useState(10);
  const [running, setRunning] = useState(false);
  const [maxTime, setMaxTime] = useState(10);

  // ----------------------- Timer Logic -----------------------
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
  };

  const next = () => {
    const pool = pools[category];
    const random = pool[Math.floor(Math.random() * pool.length)];
    setQuestion(random);
    setShowAnswer(false);
    setRunning(false);
    setTime(maxTime);
  };

  const progress = (time / maxTime) * 100;

  // ----------------------- UI -----------------------
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-xl space-y-8 transition-all duration-300">
        
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <img
            src="https://i.ibb.co/k2vd4Mbk/Logo.png"
            alt="Loco City Logo"
            className="w-44 drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]"
          />
          <h1 className="text-3xl font-extrabold text-center">
            Loco Quiz Taxi
            <br />
            <span className="text-lg text-gray-300">Moderation: Pirathas</span>
          </h1>
        </div>

        {/* Kategorie Auswahl */}
        <div className="flex gap-3 justify-center flex-wrap">
          {["regelwerk", "loco", "allgemein", "fangfragen"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                category === cat
                  ? "bg-white text-black shadow-lg shadow-white/40"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Frage Box */}
        <div className="bg-gray-700/60 p-5 rounded-xl min-h-[120px] flex items-center justify-center text-center text-xl shadow-inner shadow-black/40 transition-all duration-300">
          {question ? question.q : "Drücke auf 'Neue Frage'!"}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={next}
            className="px-6 py-3 bg-white text-black font-bold rounded-xl shadow-md hover:shadow-white/40 hover:bg-gray-200 transition-all"
          >
            Neue Frage
          </button>

          {[5, 10, 15].map((sec) => (
            <button
              key={sec}
              onClick={() => startTimer(sec)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-xl flex items-center gap-2 transition-all"
            >
              ⏱️ {sec}s
            </button>
          ))}

          {question && (
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="px-5 py-3 bg-gray-500 hover:bg-gray-400 rounded-xl transition-all"
            >
              Antwort
            </button>
          )}
        </div>

        {/* Timer */}
        {running && (
          <div className="text-center text-4xl font-bold text-white drop-shadow-lg animate-pulse">
            {time}s
          </div>
        )}

        {/* Progress Bar */}
        {running && (
          <div className="w-full bg-gray-700 h-4 rounded-xl overflow-hidden border border-gray-500 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-white to-gray-300 shadow-[0_0_15px_white] transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Antwort */}
        {showAnswer && question && (
          <div className="text-center text-2xl font-bold text-gray-200 animate-fade">
            {question.a}
          </div>
        )}
      </div>
    </div>
  );
}

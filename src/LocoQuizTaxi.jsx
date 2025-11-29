// src/LocoQuizTaxi.jsx
import { useState, useEffect } from "react";

// --- REGELWERK ---
const regelwerk = [
  { q: "Das LCPD darf im LCMD aushelfen als Zweitjob.", a: "Falsch – nur das LSFD darf dies." },
  { q: "Ein Charakter, der ausgeblutet ist, kann sich nicht mehr an die Situation erinnern.", a: "Richtig." },
  { q: "Drive-by-Schüsse sind für Fahrer eines PKW erlaubt.", a: "Falsch." },
  { q: "Streamer dürfen Supportgespräche live übertragen, solange der Chat deaktiviert ist.", a: "Falsch." },
  { q: "Beleidigungen sind erlaubt, solange sie im RP-Kontext bleiben und nicht gegen die echte Person gehen.", a: "Richtig." },
  { q: "Nach Kündigung einer staatlichen Fraktion und Beitritt zu einer Bad-Fraktion muss man 3 Tage warten.", a: "Richtig." },
  { q: "Das Stürzen einer Fraktionsleitung muss per Ticket beantragt werden.", a: "Richtig." },
  { q: "Ein Spieler, der in derselben Situation zweimal stirbt, darf nicht wiederbelebt werden.", a: "Richtig." },
  { q: "Es dürfen 70% des illegalen Bestandes bei einer Razzia abgenommen werden.", a: "Falsch – nur 50%." },
  { q: "Für eine Razzia müssen zwei Kriterien erfüllt sein: 7500 illegale Rohmaterialien, 8 Geiseln.", a: "Falsch – 15.000 Einheiten & 15 Geiseln." }
];

// --- LOCO CITY ---
const loco = [
  { q: "Das 🏙️ Loco City Team hat 8 Mitglieder.", a: "Falsch." },
  { q: "Es gibt 4 Unternehmen.", a: "Falsch – es sind mehr." },
  { q: "Loco City wurde am 05.09 released.", a: "Falsch – 06.09." },
  { q: "Es gibt regelmäßig Giveaways.", a: "Wahr." },
  { q: "Ab 6 Tagen Spielzeit gibt es Loco Family.", a: "Falsch – ab 7 Tagen." },
  { q: "Unser Peak war 44 Spieler.", a: "Falsch – 72 Spieler." },
  { q: "Die Höchstrafe beträgt 100.000$ und 60 Hafteinheiten.", a: "Wahr." },
  { q: "Wir haben 5 Streamer auf dem Server.", a: "Wahr." },
  { q: "Es gibt 13 24/7.", a: "Falsch – 18." },
  { q: "Es gibt 7 markierte Jobs.", a: "Falsch – 6." },
  { q: "Ein Volltuning kostet 60.000$.", a: "Falsch – 50.000$." },
  { q: "Wir haben 7 Lovespots.", a: "Wahr." },
  { q: "Die niedrigste PLZ ist 1000.", a: "Falsch – 200." },
  { q: "Die höchste PLZ ist 10140.", a: "Wahr." },
  { q: "Ein Menü bei Pearls kostet 1500$.", a: "Falsch – 1000$." },
  { q: "LocoCity gehört auf die 1.", a: "Wahr." },
  { q: "Ein Kaufvertrag kostet 25.000$.", a: "Wahr." },
  { q: "Man kann in Loco City nicht heiraten.", a: "Falsch – man kann heiraten." },
  { q: "Es gibt 9 Fraktionen.", a: "Falsch – 11." },
  { q: "Meta ist hier gerne gesehen.", a: "Falsch." },
  { q: "Ein Unternehmen benötigt mindestens 2 Mitglieder.", a: "Falsch – mindestens 1, maximal 10." },
  { q: "Unser Partner ist Block Design.", a: "Wahr." },
  { q: "Der größte Kofferraum sind 7500.", a: "Wahr." },
  { q: "Es gibt 4 verschiedene Rucksäcke.", a: "Falsch – Klein, Groß, Riesig." },
  { q: "Man benötigt einen Führerschein zum Fahren eines LKW.", a: "Wahr." },
  { q: "Es gibt hier keinen Waffenschein.", a: "Falsch." },
  { q: "Umbauten an Gebäuden können über den Bauamt-Discord beantragt werden.", a: "Falsch." }
];

// --- ALLGEMEINWISSEN ---
const allgemein = [
  // Basisfragen
  { q: "Wie viele Kontinente gibt es?", a: "7" },
  { q: "Wie viele Tage hat ein Schaltjahr?", a: "366" },
  { q: "Welche Farbe hat die Zunge einer Giraffe?", a: "Blau" },
  { q: "Wie viele Zähne hat ein Erwachsener?", a: "32" },
  { q: "Welches Tier ist das größte der Welt?", a: "Blauwal" },

  // Erweiterte Allgemeinfragen (gekürzt kommentiert, aber alle drin)
  { q: "Wie heißt die Hauptstadt von Japan?", a: "Tokio" },
  { q: "Wie viele Spieler stehen beim Basketball gleichzeitig pro Team auf dem Feld?", a: "5" },
  { q: "Welches Metall leitet Strom am besten?", a: "Silber" },
  { q: "Welches Tier kann am längsten ohne Wasser überleben?", a: "Kamel" },
  { q: "Wie heißt unser Erdtraband?", a: "Mond" },
  { q: "Welches Gas atmen wir hauptsächlich ein?", a: "Stickstoff" },
  { q: "Was ist die Hauptstadt der USA?", a: "Washington, D.C." },
  { q: "Wie viele Tage hat der April?", a: "30" },
  { q: "Wie heißt der schnellste Landläufer?", a: "Gepard" },
  { q: "Wie viele Farben hat ein Schachbrett?", a: "2" },
  { q: "Was ist die Hauptstadt von England?", a: "London" },
  { q: "Wie viele Planeten hat die Milchstraße?", a: "Unzählige Milliarden" },
  { q: "Welcher Planet wird auch der Rote Planet genannt?", a: "Mars" },
  { q: "Wie heißt das größte Säugetier an Land?", a: "Afrikanischer Elefant" },
  { q: "Welche Sprache spricht man in Brasilien?", a: "Portugiesisch" },
  { q: "Welches Tier legt Eier und gibt dennoch Milch?", a: "Schnabeltier" },
  { q: "Wie viele Seiten hat ein Dreieck?", a: "3" },
  { q: "Wie viele Sterne hat die US-Flagge?", a: "50" },
  { q: "Welcher Planet liegt der Sonne am nächsten?", a: "Merkur" },
  { q: "Wie viele Spieler hat ein Volleyballteam?", a: "6" },
  { q: "Wie viele Herzen hat ein Regenwurm?", a: "5 Paare" },
  { q: "Wie viele Bundesstaaten hat die USA?", a: "50" },
  { q: "Was ist die Hauptstadt von Österreich?", a: "Wien" },
  { q: "Welcher Vogel hat die größte Spannweite?", a: "Wanderalbatros" },
  { q: "Wie viele Monate haben 31 Tage?", a: "7" },
  { q: "Welches Element hat das Periodensymbol O?", a: "Sauerstoff" },
  { q: "Wie heißt der größte Vulkan Europas?", a: "Ätna" },
  { q: "Wann endete der Zweite Weltkrieg?", a: "1945" },
  { q: "Wie viele Nieren hat ein Mensch?", a: "2" },
  { q: "Wie nennt man eine Tierfresser-Pflanze?", a: "Karnivore Pflanze" },
  { q: "Wie viele Farben hat die Flagge von Italien?", a: "3" },
  { q: "Welche Blutgruppe ist am seltensten?", a: "AB-" },
  { q: "Welches Land hat die größte Bevölkerung?", a: "China" },
  { q: "Wie viele Menschen leben in Deutschland (ca.)?", a: "84 Millionen" },
  { q: "Wer malte die Mona Lisa?", a: "Leonardo da Vinci" },
  { q: "Wie heißt der größte Hai?", a: "Walhai" },
  { q: "Wie viele Tasten hat ein Standard-Klavier?", a: "88" },
  { q: "Wie heißt das größte Binnenmeer der Welt?", a: "Kaspisches Meer" },
  { q: "Welches Land erfand Pizza?", a: "Italien" },
  { q: "Wie heißt die Hauptstadt der Schweiz?", a: "Bern" },
  { q: "Wie viele Augen hat eine Biene?", a: "5" },
  { q: "Wie nennt man einen Arzt für Kinder?", a: "Pädiater" },
  { q: "Wie heißt die festeste natürliche Substanz?", a: "Diamant" },
  { q: "Welche Farbe hat Chlor?", a: "Gelbgrün" },
  { q: "Wie viele Flügel hat eine Fliege?", a: "2" },
  { q: "Wie heißt das kleinste Knochen im Körper?", a: "Steigbügel" },
  { q: "Was ist das schnellste Fahrzeug der Welt?", a: "Rakete/Spaceshuttle" },
  { q: "Wie viele Milchzähne hat ein Kind?", a: "20" },
  { q: "Wie viele Planeten hat unser Sonnensystem?", a: "8" },
  { q: "Was ist schwerer: ein Liter Öl oder ein Liter Wasser?", a: "Wasser" },
  { q: "Wie viele Minuten hat ein Tag?", a: "1440" },
  { q: "Wie viele Chromosomen hat ein Mensch?", a: "46" },
  { q: "Was ist der längste Knochen im Körper?", a: "Oberschenkelknochen" },
  { q: "Wer erfand das Telefon?", a: "Alexander Graham Bell" },
  { q: "Wie viele Sterne hat die Flagge Chinas?", a: "5" },
  { q: "Wie viele Beine hat ein Schmetterling?", a: "6" },
  { q: "Welches Tier schläft am längsten?", a: "Koala" },
  { q: "Wie viele Muskeln benutzt man beim Lächeln?", a: "17" }
];

// FANGFRAGEN (50)
const fangfragen = [
  { q: "Was wiegt mehr: 1kg Federn oder 1kg Stahl?", a: "Gleich schwer." },
  { q: "Wie viele Monate haben 28 Tage?", a: "Alle." },
  { q: "Ein Bauer hat 17 Schafe, 9 sterben. Wie viele bleiben?", a: "17 – sie gehören ihm noch." },
  { q: "Kann ein Mensch 10 Minuten ohne Luft überleben?", a: "Ja, im Schlaf atmet man automatisch." },
  { q: "Was kommt einmal in der Minute, zweimal im Moment, aber nie in 100 Jahren vor?", a: "Der Buchstabe M." },
  { q: "Wie viele Tiere nahm Moses mit auf die Arche?", a: "Keine – Noah war es." },
  { q: "Welche Frage kann man nie mit Ja beantworten?", a: "Schläfst du?" },
  { q: "Was gehört dir, wird aber von anderen öfter benutzt als von dir?", a: "Dein Name." },
  { q: "Was wird nass, je mehr es trocknet?", a: "Ein Handtuch." },
  { q: "Je mehr man davon entfernt, desto größer wird es. Was ist es?", a: "Ein Loch." },
  { q: "Wie viele Seiten hat ein Kreis?", a: "Eine – die Außenkante." },
  { q: "Womit endet Tag und beginnt Nacht?", a: "Mit dem Buchstaben T." },
  { q: "Wenn du ein Rennen läufst und den Zweiten überholst, welcher Platz bist du?", a: "Zweiter." },
  { q: "Was kann man brechen, ohne es anzufassen?", a: "Ein Versprechen." },
  { q: "Was steigt, aber fällt nie?", a: "Dein Alter." },
  { q: "Wie viele Tiere jeder Art nahm Noah in die Arche?", a: "Zwei." },
  { q: "Welche Zahl ist immer falsch geschrieben?", a: "Das Wort 'falsch' selbst." },
  { q: "Was lebt, wenn es gefüttert wird, stirbt aber, wenn man ihm Wasser gibt?", a: "Feuer." },
  { q: "Was kann jeder brechen, doch niemand reparieren?", a: "Zeit." },
  { q: "Welcher Monat hat 32 Tage?", a: "Keiner." },

  // +30 neue
  { q: "Was wird größer, je mehr man wegnimmt?", a: "Ein Loch." },
  { q: "Was hat viele Schlüssel, aber keine Türen?", a: "Ein Klavier." },
  { q: "Was kann man fangen, aber nicht werfen?", a: "Eine Erkältung." },
  { q: "Was hat ein Ende, aber keinen Anfang?", a: "Ein Stock." },
  { q: "Welche Uhr zeigt nie die richtige Zeit?", a: "Eine kaputte Uhr." },
  { q: "Was läuft ohne Beine?", a: "Ein Wasserhahn." },
  { q: "Was hat Städte, aber keine Häuser?", a: "Eine Landkarte." },
  { q: "Was hat ein Herz, aber schlägt nicht?", a: "Ein Salatkopf." },
  { q: "Was kann man öffnen, aber nicht schließen?", a: "Ein Ei." },
  { q: "Was endet immer mit einem E?", a: "Jede Zahl in Worten (z.B. 'Eins', 'Drei' – hier als Fangfrage je nach Sprache)." },
  { q: "Welcher Ball springt nicht?", a: "Ein Schneeball." },
  { q: "Was ist voller Löcher, hält aber Wasser?", a: "Ein Schwamm." },
  { q: "Was hat einen Hals, aber keinen Kopf?", a: "Eine Flasche." },
  { q: "Was läuft, ohne sich zu bewegen?", a: "Die Zeit." },
  { q: "Was hat Beine, kann aber nicht gehen?", a: "Ein Tisch." },
  { q: "Was ist schwer zu heben, aber leicht zu werfen?", a: "Ein Blick." },
  { q: "Was hat viele Augen, kann aber nicht sehen?", a: "Ein Würfel." },
  { q: "Was hat vier Beine und kann trotzdem nicht laufen?", a: "Ein Stuhl." },
  { q: "Was bricht, wenn du seinen Namen sagst?", a: "Die Stille." },
  { q: "Was verliert man, sobald man es ausspricht?", a: "Ein Geheimnis." },
  { q: "Was kann man einmal geben, aber nie zurücknehmen?", a: "Ein Wort." },
  { q: "Was ist immer vor dir, aber nie zu sehen?", a: "Die Zukunft." },
  { q: "Was hat Hände, aber kann nicht klatschen?", a: "Eine Uhr." },
  { q: "Was kann man nicht halten, obwohl es existiert?", a: "Ein Gedanke." },
  { q: "Was wird kleiner, wenn man es teilt?", a: "Ein Geheimnis." },
  { q: "Was kann man essen, aber nicht verdauen?", a: "Wörter (im übertragenen Sinn)." },
  { q: "Was ist so zerbrechlich, dass schon ein Flüstern es zerstört?", a: "Die Stille." },
  { q: "Was ist immer da, aber verschwindet, sobald Licht kommt?", a: "Dunkelheit." },
  { q: "Was öffnet jede Tür, obwohl es kein Schlüssel ist?", a: "Ein Lächeln." },
  { q: "Was ist schwerer zu fangen, je schneller du rennst?", a: "Dein Atem" },
{ q: "Was kann man brechen, ohne es in der Hand zu halten?", a: "Ein Versprechen" },
{ q: "Was hat ein Bett, aber schläft nie?", a: "Ein Fluss" },
{ q: "Was wird größer, je mehr man davon klaut?", a: "Ein Loch" },
{ q: "Was kann jeder öffnen, aber niemand schließen?", a: "Zeit" },
{ q: "Was kann man teilen, ohne weniger zu haben?", a: "Wissen" },
{ q: "Was hat überall Haare, aber keinen Körper?", a: "Eine Bürste" },
{ q: "Was läuft herum, bleibt aber immer an derselben Stelle?", a: "Die Uhr" },
{ q: "Was hat Wurzeln, die niemand sieht, und wächst trotzdem?", a: "Ein Berg" },
{ q: "Was ist weiß, wenn es schmutzig ist?", a: "Eine Tafel" },
{ q: "Was geht hoch und runter, bleibt aber am selben Ort?", a: "Eine Treppe" },
{ q: "Wovon gibt es eins in einem Zimmer, zwei in einer Küche, aber keins im Haus?", a: "Der Buchstabe K" },
{ q: "Was gehört dir, aber andere benutzen es öfter als du?", a: "Dein Name" },
{ q: "Was hat viele Nadeln, aber kann nicht nähen?", a: "Ein Tannenbaum" },
{ q: "Was wird kleiner, wenn man es teilt?", a: "Ein Geheimnis" },
{ q: "Wovor kannst du nicht weglaufen, egal wie schnell du bist?", a: "Dein Schatten" },
{ q: "Was kannst du nur einmal aussprechen?", a: "Ein Schweigegelübde" },
{ q: "Was kann man verlieren, obwohl man es nie in der Hand hatte?", a: "Die Geduld" },
{ q: "Was lebt im Wasser, stirbt aber, wenn es nass wird?", a: "Salz" },
{ q: "Was kann man werfen, obwohl man es nicht anfassen kann?", a: "Einen Blick" }

];

// GAMING (60)
const gaming = [
  { q: "Wie heißt der Klempner aus Mario?", a: "Mario." },
  { q: "Wie heißt sein Bruder?", a: "Luigi." },
  { q: "Aus welchem Spiel stammt der Creeper?", a: "Minecraft." },
  { q: "Wie heißt die Stadt in GTA V?", a: "Los Santos." },
  { q: "Wie heißt der Held in Zelda?", a: "Link." },
  { q: "Welche Firma entwickelte Fortnite?", a: "Epic Games." },
  { q: "Wie heißt die virtuelle Währung in Fortnite?", a: "V-Bucks." },
  { q: "Wie heißt die beliebte Drachenform in Pokémon?", a: "Glurak." },
  { q: "Welches RPG gilt als eines der besten aller Zeiten?", a: "The Witcher 3." },
  { q: "Welche Farbe hat Sonic?", a: "Blau." },

  // +50 weitere Gaming-Fragen
  { q: "Wie heißt die normale Welt in Minecraft?", a: "Overworld." },
  { q: "Wie heißt Nintendos aktuelle Hybrid-Konsole?", a: "Nintendo Switch." },
  { q: "Welche Figur gilt lange als PlayStation-Maskottchen?", a: "Crash Bandicoot." },
  { q: "Wie heißt der Endboss im End in Minecraft?", a: "Enderdrache." },
  { q: "Wie heißt der Affe aus Donkey Kong?", a: "Donkey Kong." },
  { q: "Wie heißt die erste Warzone-Map?", a: "Verdansk." },
  { q: "In welchem Spiel jagt man Geister mit einem Staubsauger?", a: "Luigi’s Mansion." },
  { q: "In welchem Spiel gibt es den Modus 'Dust II'?", a: "CS:GO." },
  { q: "Wie heißt der Protagonist aus God of War?", a: "Kratos." },
  { q: "Wie heißt das Auto-Fußball-Spiel mit Boost?", a: "Rocket League." },
  { q: "Wie heißt die Horror-Bärenfigur aus FNAF?", a: "Freddy Fazbear." },
  { q: "Wie heißt die Währung in GTA Online?", a: "GTA-Dollar." },
  { q: "Wie heißt der pinke Sauger-Held von Nintendo?", a: "Kirby." },
  { q: "Wie heißt der Zombies-Modus in Call of Duty?", a: "Zombies." },
  { q: "Wie heißt die höchste Rangstufe in Apex Legends?", a: "Predator." },
  { q: "Wie heißt das bekannte MOBA von Riot Games?", a: "League of Legends." },
  { q: "Wie heißt der blaue Schildpanzer in Mario Kart?", a: "Blauer Panzer." },
  { q: "Wie heißt das Standard-Skelett-Mob in Minecraft?", a: "Skelett." },
  { q: "In welchem Spiel gibt es den Charakter Tracer?", a: "Overwatch." },
  { q: "Wie heißt Links Pferd in vielen Zelda-Spielen?", a: "Epona." },
  { q: "Wie heißt Sonics Erzfeind?", a: "Dr. Eggman." },
  { q: "Wie heißt die erste Pokémon-Region?", a: "Kanto." },
  { q: "In welchem Spiel spielt man Geralt von Riva?", a: "The Witcher." },
  { q: "Wie heißen die Avatare auf Nintendo-Konsolen?", a: "Miis." },
  { q: "Wie heißt der Battle Royale Modus in Fortnite?", a: "Fortnite Battle Royale." },
  { q: "Wie heißt das stärkste Material in Minecraft (Endgame)?", a: "Netherit." },
  { q: "Wie heißt die Wüstenmap aus PUBG?", a: "Miramar." },
  { q: "Welche Farbe hat die legendäre Waffe in Fortnite?", a: "Gold." },
  { q: "Wie heißt das Heldenteam im Spiel Overwatch?", a: "Overwatch." },
  { q: "Wie heißt die Axt von Kratos im Reboot?", a: "Leviathan-Axt." },
  { q: "Wie heißt das gelbe runde Wesen aus dem Arcade-Klassiker?", a: "Pac-Man." },
  { q: "Wie heißt das Level-System in Fortnite?", a: "Battle Pass." },
  { q: "Welche Farbe hat die Rüstung des Master Chief?", a: "Grün." },
  { q: "Wie heißt die bekannte Rennspielreihe von Xbox?", a: "Forza Horizon." },
  { q: "Wie heißt der Hauptcharakter aus Red Dead Redemption 2?", a: "Arthur Morgan." },
  { q: "Wie heißt der Endgegner in GTA San Andreas?", a: "Big Smoke (Storyfinale mit ihm)." },
  { q: "In welchem Spiel wurde der Meme-Song 'Creeper, Aww Man' populär?", a: "Minecraft." },
  { q: "Wie heißt die Standard-Pistole der Terroristen in CS:GO?", a: "Glock-18." },
  { q: "Wie heißt die klassische Raumschiff-Map in Among Us?", a: "The Skeld." },
  { q: "Wie heißt die Insel, auf der man in Animal Crossing lebt?", a: "Eigene Insel (Name frei wählbar)." },
  { q: "Wie heißt die berühmte Welt Hyrule-Heldensaga?", a: "The Legend of Zelda." },
  { q: "In welchem Spiel findet man die Figur 'Steve' als Standard-Skin?", a: "Minecraft." },
  { q: "Wie heißt der Modus in Call of Duty, in dem 100 Spieler gegeneinander antreten?", a: "Battle Royale / Warzone." },
  { q: "Wie heißt die Firma hinter der Halo-Reihe?", a: "Bungie (ursprünglich), später 343 Industries." },
  { q: "Wie heißt die Währung in League of Legends, die man kostenlos verdient?", a: "Blaue Essenz." },
  { q: "Wie heißt der Champion mit dem Haken in League of Legends?", a: "Thresh." },
  { q: "Wie heißt der Held mit dem Bogen in Overwatch?", a: "Hanzo." },
  { q: "In welchem Spiel kämpft man in Erangel?", a: "PUBG." },
  { q: "Wie heißt der Survival-Modus von Minecraft?", a: "Survival-Modus." },
  { q: "Wie heißt der Modus in FIFA, in dem man Karten und Teams sammelt?", a: "Ultimate Team." },
  { q: "Wie heißt das gelbe runde Wesen aus dem Arcade-Klassiker von 1980?", a: "Pac-Man" },
{ q: "Wie heißt der Gegenspieler von Pac-Man?", a: "Blinky (roter Geist)" },
{ q: "Wie heißt das erste erfolgreiche Videospiel aller Zeiten?", a: "Pong" },
{ q: "Wie heißt der Erfinder von Mario?", a: "Shigeru Miyamoto" },
{ q: "In welchem Jahr erschien das erste Super Mario Bros.?", a: "1985" },
{ q: "Wie heißt Segas bekanntester Charakter?", a: "Sonic the Hedgehog" },
{ q: "Wie heißt der Endgegner in den klassischen Sonic-Spielen?", a: "Dr. Robotnik / Dr. Eggman" },
{ q: "Wie heißt der Held aus dem NES-Spiel 'Metroid'?", a: "Samus Aran" },
{ q: "Wie heißt die legendäre 8-Bit-Konsole von Nintendo?", a: "NES (Nintendo Entertainment System)" },
{ q: "Wie heißt Segas 16-Bit-Konsole?", a: "Mega Drive / Genesis" },
{ q: "Wie heißt Links erstes Abenteuer?", a: "The Legend of Zelda (1986)" },
{ q: "Wie heißt die Welt in den ersten Zelda-Teilen?", a: "Hyrule" },
{ q: "Wie heißt das Alien, das Tetris weltweit bekannt machte?", a: "Keins – Tetris ist von Alexei Paschitnow" },
{ q: "Wie heißt der Erfinder von Tetris?", a: "Alexei Paschitnow" },
{ q: "Welche Farbe hat Mega Man hauptsächlich?", a: "Blau" },
{ q: "Wie heißt das Arcade-Spiel, in dem man Fässer ausweicht?", a: "Donkey Kong" },
{ q: "Wie heißt der Held aus Donkey Kong (damals noch)?", a: "Jumpman (später Mario)" },
{ q: "Wie hieß Segas erste Handheld-Konsole?", a: "Game Gear" },
{ q: "Wie heißt der grüne Drache aus 'Adventure Island'?", a: "Keine offizielle Antwort – das Reittier ist ein Dinosaurier" },
{ q: "Wie heißt das berühmte Labyrinth-Spiel mit Käse und Katzen?", a: "Mappy" },
{ q: "Wie heißt der erste Kampfspiel-Klassiker von Capcom?", a: "Street Fighter (1987)" },
{ q: "Wie heißt der legendäre Hadouken-Werfer?", a: "Ryu" },
{ q: "Wie heißt der Endboss aus dem Original-Street Fighter II?", a: "M. Bison" },
{ q: "Wie heißt das Horrorhaus aus dem NES-Spiel?", a: "Sweet Home" },
{ q: "Aus welchem Retro-Spiel stammt die Figur 'Simon Belmont'?", a: "Castlevania" },
{ q: "Aus welchem Spiel stammt der Charakter 'Kirby'?", a: "Kirby’s Dream Land (1992)" },
{ q: "Wie heißt das klassische Beat-'em-up mit den Brüdern Billy und Jimmy Lee?", a: "Double Dragon" },
{ q: "Wie heißt der erste Doom-Release?", a: "1993" },
{ q: "Wie heißt der Held aus dem Original 'Final Fantasy'?", a: "Der Krieger des Lichts (kein Name)" },
{ q: "Wie heißt das berühmte Pen-&-Paper-inspirierte Retro-RPG von Blizzard?", a: "Diablo (1996)" }

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

  // Joker (Taxi-Joker mit 60s Cooldown)
  const [jokerCooldown, setJokerCooldown] = useState(0);

  // TIMER: runterzählen
  useEffect(() => {
    if (!running) return;

    if (time === 0) {
      setRunning(false);
      setShowAnswer(true);
      const audio = new Audio(
        "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
      );
      audio.play();
      return;
    }

    const t = setTimeout(() => setTime((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [time, running]);

  // JOKER COOLDOWN runterzählen
  useEffect(() => {
    if (jokerCooldown <= 0) return;

    const interval = setInterval(() => {
      setJokerCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [jokerCooldown]);

  const startTimer = (sec) => {
    setMaxTime(sec);
    setTime(sec);
    setRunning(true);
    setShowAnswer(false);
  };

  const next = () => {
    const pool = pools[category];
    if (!pool || pool.length === 0) return;

    const random = pool[Math.floor(Math.random() * pool.length)];
    setQuestion(random);
    setShowAnswer(false);
    setRunning(false);
    setTime(maxTime);
  };

  // 🚕 Taxi-Joker: Frage skippen + 60s Cooldown
  const useJoker = () => {
    if (jokerCooldown > 0) return;
    next(); // neue Frage
    setJokerCooldown(60); // Cooldown starten
  };

  const progress = maxTime > 0 ? (time / maxTime) * 100 : 0;
  const jokerProgress = (jokerCooldown / 60) * 100;

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex items-start justify-center p-6 gap-6">
      {/* MAIN QUIZ CONTAINER */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-xl space-y-5 transition-all duration-300 ease-out">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <img
            src="https://i.ibb.co/k2vd4Mbk/Logo.png"
            alt="Loco City Logo"
            className="w-40 opacity-90"
          />
          <h1 className="text-3xl font-bold text-center text-white">
            Loco Quiz Taxi
            <br />
            <span className="text-lg text-gray-300">Moderation: Pirathas</span>
          </h1>
        </div>

        {/* Kategorie Auswahl */}
        <div className="flex gap-3 justify-center flex-wrap">
          {Object.keys(pools).map((cat) => (
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

        {/* Frage */}
        <div className="bg-gray-700 p-4 rounded-xl min-h-[120px] flex items-center justify-center text-center text-lg">
          {question ? question.q : "Drücke auf 'Neue Frage'!"}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={next}
            className="px-5 py-3 bg-gray-500 hover:bg-gray-400 text-black font-bold rounded-xl"
          >
            Neue Frage
          </button>

          <button
            onClick={() => startTimer(5)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-xl"
          >
            ⏱️ 5s
          </button>
          <button
            onClick={() => startTimer(10)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-xl"
          >
            ⏱️ 10s
          </button>
          <button
            onClick={() => startTimer(15)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-xl"
          >
            ⏱️ 15s
          </button>

          {question && (
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="px-5 py-3 bg-gray-500 hover:bg-gray-400 rounded-xl"
            >
              Antwort
            </button>
          )}
        </div>

        {/* 🚕 Taxi-Joker Button mit gelber Progressbar */}
        <button
          onClick={useJoker}
          disabled={jokerCooldown > 0}
          className={`relative w-full px-5 py-3 mt-2 rounded-xl font-bold text-black overflow-hidden transition-all ${
            jokerCooldown > 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-300"
          }`}
        >
          {jokerCooldown > 0 && (
            <div
              className="absolute left-0 top-0 h-full bg-yellow-500 opacity-60 transition-all duration-100"
              style={{ width: `${jokerProgress}%` }}
            ></div>
          )}
          <span className="relative z-10">
            {jokerCooldown > 0 ? `⏳ ${jokerCooldown}s` : "🚕 Taxi-Joker"}
          </span>
        </button>

        {/* Timeranzeige */}
        {running && (
          <div
            className={`text-center text-3xl font-bold ${
              time <= 3 ? "text-gray-100 animate-pulse" : "text-gray-200"
            }`}
          >
            {time}s
          </div>
        )}

        {/* Progressbar unten */}
        {running && (
          <div className="w-full bg-gray-700 h-4 rounded-xl overflow-hidden border border-gray-500 shadow-inner">
            <div
              className="h-4 bg-gradient-to-r from-gray-200 to-white transition-all duration-300 shadow-lg shadow-gray-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Antwort */}
        {showAnswer && question && (
          <div className="text-center text-xl font-bold text-gray-300">
            {question.a}
          </div>
        )}
      </div>

      {/* INFO LEISTE RECHTS */}
      <div className="w-[350px] bg-gray-800 p-5 rounded-2xl shadow-xl space-y-4 h-fit">
        <h2 className="text-2xl font-bold text-green-300">📘 Regeln</h2>
        <ul className="text-gray-300 space-y-2 text-lg">
          <li>✔ Maximal 12 Fragen pro Spieler</li>
          <li>✔ Maximal 1 Joker pro Spieler</li>
          <li>✔ Hauptgewinn: 1 Case</li>
          <li>✔ Trostpreis: 2 Rubbelose</li>
          <li>❌ Falsch beantwortet → Raus aus dem Taxi!</li>
          <li>🟩 Grüne Wiese = Safezone</li>
        </ul>
      </div>
    </div>
  );
}

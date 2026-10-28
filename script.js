/* ==========================================================================
   INVITO DI LAUREA — MATTIA
   JavaScript vanilla, nessuna libreria esterna.
   ========================================================================== */

/* ---------------------------------------------------------------------- *
 * 1. CONFIGURAZIONE — modifica solo questi valori per personalizzare
 *    l'invito. Nessun'altra riga del file va toccata per i casi d'uso
 *    normali.
 *
 *    I valori scritti tra parentesi quadre, es. "[DA COMPILARE]", sono
 *    segnaposto: NON sono dati inventati, vanno sostituiti con quelli
 *    reali prima di mandare il link agli invitati.
 * ---------------------------------------------------------------------- */
const CONFIG = {
  name: "Mattia",
  degree: "Scienze Motorie",

  // Il cane: nome e "titolo ufficiale" ironico mostrato sotto la sua foto.
  // Se non conosci il nome del cane, sostituisci "il cane" col nome vero.
  dogName: "il cane",
  dogTitle: "Direttore delle Selezioni",
  // Percorso della foto del cane: la stessa immagine è usata sia nella
  // schermata iniziale sia in quella del test. Vedi il README per dove
  // caricare il file.
  dogPhoto: "assets/cane-principale.jpg",

  // Evento — lascia i segnaposto finché non hai i dati reali.
  date: "[DA COMPILARE]",          // es. "12 settembre 2026"
  time: "[DA COMPILARE]",          // es. "11:30"
  venueName: "[DA COMPILARE]",
  address: "[DA COMPILARE]",
  mapsUrl: "",                     // es. "https://maps.google.com/?q=..."
  notes: "",                       // indicazioni pratiche opzionali, es. dress code o parcheggio — lascia "" per nascondere la riga

  // Messaggio finale "del cane" dopo lo sblocco e nota a piè di pagina.
  // dogSignoff ha due varianti: superamento pulito del test, oppure
  // accesso concesso "per grazia" dopo aver fallito tutti i tentativi.
  dogSignoffClean: "Approvato senza riserve. Raro, ma accade.",
  dogSignoffGrace: "Tre tentativi falliti. Ti ammettiamo per sfinimento, non per merito.",
  finalLine: "Il fascicolo è ufficialmente chiuso.",

  // Conferma presenza via WhatsApp.
  // Numero in formato internazionale senza "+" (es. "393331234567").
  // Se lasciato vuoto, il pulsante apre comunque WhatsApp con il testo
  // pronto, senza destinatario preimpostato.
  whatsappNumber: "",
  whatsappMessage:
    "Ci sarò! 🎓 Ho superato la selezione del cane, non mi perdo la laurea in {degree} di {name} il {date}.",

  // Parametri del test di reattività.
  maxAttempts: 3,              // attenzione: l'HTML ha 3 pallini pronti; cambiare questo numero richiede aggiungere/togliere pallini in index.html
  zoneWidthPercent: 24,        // quanto è larga la "zona idonea" (più alto = più facile)
  indicatorSweepMs: 1500,      // tempo per attraversare la barra da un capo all'altro, al primo tentativo
  speedStepMs: 120,            // quanto si velocizza a ogni tentativo successivo
  minSweepMs: 850,             // velocità massima oltre la quale non si spinge, per restare giocabile

  soundEnabledByDefault: true,
};

/* ---------------------------------------------------------------------- *
 * 2. RIFERIMENTI DOM
 * ---------------------------------------------------------------------- */
const screenIntro    = document.getElementById("screenIntro");
const screenBriefing = document.getElementById("screenBriefing");
const screenGame     = document.getElementById("screenGame");
const screenReveal   = document.getElementById("screenReveal");

const startBtn      = document.getElementById("startBtn");
const beginGameBtn  = document.getElementById("beginGameBtn");

const dogImgIntro      = document.getElementById("dogImgIntro");
const dogFallbackIntro = document.getElementById("dogFallbackIntro");
const dogImgGame       = document.getElementById("dogImgGame");
const dogFallbackGame  = document.getElementById("dogFallbackGame");
const dogTitleTag      = document.getElementById("dogTitleTag");

const attemptsInBriefing = document.getElementById("attemptsInBriefing");

const reflexTrack     = document.getElementById("reflexTrack");
const reflexZone      = document.getElementById("reflexZone");
const reflexIndicator = document.getElementById("reflexIndicator");
const stopBtn         = document.getElementById("stopBtn");
const verdictLine     = document.getElementById("verdictLine");
const dotEls = [
  document.getElementById("dot1"),
  document.getElementById("dot2"),
  document.getElementById("dot3"),
];

const stampOverlay = document.getElementById("stampOverlay");
const confettiLayer = document.getElementById("confettiLayer");
const appEl = document.getElementById("app");

const soundToggle = document.getElementById("soundToggle");
const soundIcon   = document.getElementById("soundIcon");

const dogSignoff    = document.getElementById("dogSignoff");
const detailDegree  = document.getElementById("detailDegree");
const detailDate    = document.getElementById("detailDate");
const detailTime    = document.getElementById("detailTime");
const detailVenue   = document.getElementById("detailVenue");
const detailAddress = document.getElementById("detailAddress");
const detailMapsLink = document.getElementById("detailMapsLink");
const detailNotesRow = document.getElementById("detailNotesRow");
const detailNotes    = document.getElementById("detailNotes");
const whatsappBtn   = document.getElementById("whatsappBtn");
const calendarBtn   = document.getElementById("calendarBtn");
const copyBtn       = document.getElementById("copyBtn");
const finalLineEl   = document.getElementById("finalLine");

/* ---------------------------------------------------------------------- *
 * 3. APPLICA LA CONFIGURAZIONE AL TESTO DELLA PAGINA
 * ---------------------------------------------------------------------- */
function isPlaceholder(value) {
  return !value || value.trim() === "" || value.trim().startsWith("[");
}

function applyConfig() {
  document.querySelectorAll("#nameInline, #nameInline2").forEach(el => {
    el.textContent = CONFIG.name;
  });
  document.getElementById("degreeInlineIntro").textContent = CONFIG.degree;
  dogTitleTag.textContent = CONFIG.dogTitle;
  attemptsInBriefing.textContent = CONFIG.maxAttempts;

  detailDegree.textContent = CONFIG.degree;
  detailDate.textContent = CONFIG.date;
  detailTime.textContent = CONFIG.time;
  detailVenue.textContent = CONFIG.venueName;
  detailAddress.textContent = CONFIG.address;

  // Il link Maps resta attivo solo se abbiamo un URL reale: altrimenti lo
  // disattiviamo (niente link che porta a un indirizzo inesistente).
  if (!isPlaceholder(CONFIG.mapsUrl)) {
    detailMapsLink.href = CONFIG.mapsUrl;
  } else {
    detailMapsLink.removeAttribute("href");
    detailMapsLink.setAttribute("aria-disabled", "true");
    detailMapsLink.style.pointerEvents = "none";
    detailMapsLink.style.opacity = ".6";
    detailMapsLink.querySelector(".maps-arrow").style.display = "none";
  }

  if (!isPlaceholder(CONFIG.notes)) {
    detailNotes.textContent = CONFIG.notes;
  } else {
    detailNotesRow.style.display = "none";
  }

  finalLineEl.textContent = CONFIG.finalLine;

  // Link WhatsApp con messaggio precompilato
  const text = CONFIG.whatsappMessage
    .replace("{degree}", CONFIG.degree)
    .replace("{name}", CONFIG.name)
    .replace("{date}", CONFIG.date);
  const base = CONFIG.whatsappNumber
    ? `https://wa.me/${CONFIG.whatsappNumber}`
    : `https://wa.me/`;
  whatsappBtn.href = `${base}?text=${encodeURIComponent(text)}`;
}
applyConfig();

/* ---------------------------------------------------------------------- *
 * 4. FALLBACK IMMAGINI
 *    Se dogPhoto non è ancora stata caricata nella cartella assets/, la
 *    pagina mostra automaticamente un'illustrazione al suo posto: il
 *    sito resta perfetto anche prima che le foto vere siano pronte.
 * ---------------------------------------------------------------------- */
function useFallback(imgEl, fallbackEl) {
  imgEl.style.display = "none";
  fallbackEl.style.display = "block";
}
[dogImgIntro, dogImgGame].forEach(img => img.src = CONFIG.dogPhoto);
dogImgIntro.addEventListener("error", () => useFallback(dogImgIntro, dogFallbackIntro));
dogImgGame.addEventListener("error", () => useFallback(dogImgGame, dogFallbackGame));
window.addEventListener("load", () => {
  if (!dogImgIntro.complete || dogImgIntro.naturalWidth === 0) useFallback(dogImgIntro, dogFallbackIntro);
  if (!dogImgGame.complete || dogImgGame.naturalWidth === 0) useFallback(dogImgGame, dogFallbackGame);
});

/* ---------------------------------------------------------------------- *
 * 5. AUDIO — un piccolo fischietto sintetizzato via Web Audio API.
 *    Nessun file audio esterno è necessario. Parte solo dopo un gesto
 *    dell'utente (il primo tentativo), rispettando le policy dei browser,
 *    ed è sempre disattivabile dal toggle in alto.
 * ---------------------------------------------------------------------- */
let audioCtx = null;
let soundEnabled = CONFIG.soundEnabledByDefault;
updateSoundIcon();

function getAudioCtx() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  return audioCtx;
}

// Fischietto breve, in stile "test superato" da allenatore.
function playWhistle() {
  if (!soundEnabled) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  const t0 = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(1100, t0);
  osc.frequency.linearRampToValueAtTime(1750, t0 + 0.09);
  osc.frequency.linearRampToValueAtTime(950, t0 + 0.16);
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(0.13, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.26);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + 0.28);

  // Un piccolo "thud" grave in coda, a tempo con l'impatto del timbro.
  const t1 = t0 + 0.2;
  const thud = ctx.createOscillator();
  const thudGain = ctx.createGain();
  thud.type = "sine";
  thud.frequency.setValueAtTime(130, t1);
  thud.frequency.exponentialRampToValueAtTime(60, t1 + 0.18);
  thudGain.gain.setValueAtTime(0.16, t1);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, t1 + 0.22);
  thud.connect(thudGain).connect(ctx.destination);
  thud.start(t1);
  thud.stop(t1 + 0.24);
}

// Click neutro e discreto per un tentativo fallito.
function playMissTick() {
  if (!soundEnabled) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  const t0 = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(260, t0);
  gain.gain.setValueAtTime(0.05, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.08);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + 0.09);
}

function updateSoundIcon() {
  soundIcon.textContent = soundEnabled ? "♪" : "𝄽";
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  soundToggle.setAttribute("aria-label", soundEnabled ? "Disattiva audio" : "Attiva audio");
}
soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  updateSoundIcon();
});

/* ---------------------------------------------------------------------- *
 * 6. TRANSIZIONI TRA SCHERMATE
 * ---------------------------------------------------------------------- */
function goTo(fromEl, toEl) {
  fromEl.dataset.state = "leaving";
  fromEl.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    fromEl.dataset.state = "idle";
    fromEl.style.position = "absolute";
  }, 550);

  toEl.style.position = "relative";
  toEl.dataset.state = "active";
  toEl.setAttribute("aria-hidden", "false");
}

startBtn.addEventListener("click", () => {
  goTo(screenIntro, screenBriefing);
});

beginGameBtn.addEventListener("click", () => {
  goTo(screenBriefing, screenGame);
  window.setTimeout(beginTest, 600); // aspetta che la transizione finisca
});

/* ---------------------------------------------------------------------- *
 * 7. IL TEST DI REATTIVITÀ
 *    Un indicatore scorre avanti e indietro lungo una barra. L'utente
 *    deve fermarlo (tasto, tocco/click sulla barra, o Spazio/Invio da
 *    tastiera) mentre si trova nella "zona idonea", evidenziata in verde.
 *    Se fallisce tutti i tentativi disponibili, l'accesso viene comunque
 *    concesso "per grazia": il test non deve mai bloccare davvero nessuno.
 * ---------------------------------------------------------------------- */
let attemptsUsed = 0;
let gameActive = false;
let indicatorPos = 0;   // 0–100, posizione lungo la barra
let direction = 1;      // 1 = verso destra, -1 = verso sinistra
let zoneLeft = 35;
let zoneWidth = CONFIG.zoneWidthPercent;
let rafId = null;
let lastTimestamp = null;

function beginTest() {
  attemptsUsed = 0;
  dotEls.forEach(dot => dot && dot.classList.remove("is-current", "is-success", "is-fail"));
  if (dotEls[0]) dotEls[0].classList.add("is-current");
  startAttempt();
}

function currentSweepMs() {
  const ms = CONFIG.indicatorSweepMs - attemptsUsed * CONFIG.speedStepMs;
  return Math.max(ms, CONFIG.minSweepMs);
}

function startAttempt() {
  zoneWidth = CONFIG.zoneWidthPercent;
  const margin = 6;
  zoneLeft = margin + Math.random() * (100 - zoneWidth - margin * 2);
  reflexZone.style.setProperty("--zone-left", zoneLeft + "%");
  reflexZone.style.setProperty("--zone-width", zoneWidth + "%");

  indicatorPos = 0;
  direction = 1;
  reflexIndicator.classList.remove("is-stopped", "is-success", "is-fail");
  reflexIndicator.style.setProperty("--indicator-pos", "0%");

  gameActive = true;
  lastTimestamp = null;
  setVerdict(attemptsUsed === 0 ? "Fermalo nella zona verde quando vuoi." : "Di nuovo. Concentrazione.", null);
  rafId = requestAnimationFrame(tick);
}

function tick(timestamp) {
  if (!gameActive) return;
  if (lastTimestamp === null) lastTimestamp = timestamp;
  const dt = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  const sweepMs = currentSweepMs();
  const deltaPercent = (100 / sweepMs) * dt;
  indicatorPos += deltaPercent * direction;
  if (indicatorPos >= 100) { indicatorPos = 100; direction = -1; }
  if (indicatorPos <= 0) { indicatorPos = 0; direction = 1; }

  reflexIndicator.style.setProperty("--indicator-pos", indicatorPos + "%");
  rafId = requestAnimationFrame(tick);
}

function setVerdict(text, tone) {
  verdictLine.textContent = text;
  if (tone) {
    verdictLine.dataset.tone = tone;
  } else {
    delete verdictLine.dataset.tone;
  }
}

function markDot(index, success) {
  const dot = dotEls[index];
  if (dot) {
    dot.classList.remove("is-current");
    dot.classList.add(success ? "is-success" : "is-fail");
  }
  const next = dotEls[index + 1];
  if (next) next.classList.add("is-current");
}

function stopIndicator() {
  if (!gameActive) return;
  gameActive = false;
  cancelAnimationFrame(rafId);

  const zoneStart = zoneLeft;
  const zoneEnd = zoneLeft + zoneWidth;
  const success = indicatorPos >= zoneStart && indicatorPos <= zoneEnd;

  reflexIndicator.classList.add("is-stopped", success ? "is-success" : "is-fail");
  markDot(attemptsUsed, success);
  attemptsUsed++;

  if (success) {
    setVerdict("Dentro. A quanto pare la laurea non ti ha tolto tutti i riflessi.", "success");
    completeTest(false);
    return;
  }

  playMissTick();

  if (attemptsUsed >= CONFIG.maxAttempts) {
    // Mai lasciare davvero bloccato l'utente: dopo l'ultimo tentativo
    // fallito, l'accesso viene concesso comunque.
    setVerdict("Fuori anche stavolta. Il comitato soprassiede: sei dentro lo stesso.", "fail");
    window.setTimeout(() => completeTest(true), 1000);
    return;
  }

  const distance = Math.min(Math.abs(indicatorPos - zoneStart), Math.abs(indicatorPos - zoneEnd));
  setVerdict(distance < 8 ? "Sfiorato. Riprova." : "Non pervenuto. Riprova.", "fail");
  window.setTimeout(startAttempt, 1000);
}

// Tre modi per fermare l'indicatore: click/tocco sulla barra, il pulsante
// dedicato, oppure Spazio/Invio da tastiera (la barra è focalizzabile).
reflexTrack.addEventListener("pointerdown", stopIndicator);
reflexTrack.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    stopIndicator();
  }
});
stopBtn.addEventListener("click", stopIndicator);

/* ---------------------------------------------------------------------- *
 * 8. SUCCESSO: timbro di autorizzazione, scaglie d'inchiostro, poi reveal
 * ---------------------------------------------------------------------- */
function completeTest(isGrace) {
  playWhistle();
  triggerStamp();
  spawnInkFlecks();

  dogSignoff.textContent = isGrace ? CONFIG.dogSignoffGrace : CONFIG.dogSignoffClean;

  window.setTimeout(() => {
    goTo(screenGame, screenReveal);
  }, 1300);
}

function triggerStamp() {
  stampOverlay.classList.add("is-active");
  appEl.classList.add("is-stamped");
  window.setTimeout(() => appEl.classList.remove("is-stamped"), 420);
  window.setTimeout(() => stampOverlay.classList.remove("is-active"), 1400);
}

function spawnInkFlecks() {
  const colors = ["var(--red)", "var(--red-deep)", "var(--green)", "var(--green-deep)"];
  const originX = window.innerWidth / 2;
  const originY = window.innerHeight / 2;

  const count = 22;
  for (let i = 0; i < count; i++) {
    const fleck = document.createElement("span");
    fleck.className = "ink-fleck";

    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 90;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    fleck.style.setProperty("--tx", tx + "px");
    fleck.style.setProperty("--ty", ty + "px");
    fleck.style.setProperty("--rot", (Math.random() * 300 - 150) + "deg");
    fleck.style.setProperty("--dur", (0.5 + Math.random() * 0.4) + "s");
    fleck.style.setProperty("--delay", (Math.random() * 0.2) + "s");
    fleck.style.setProperty("--size", (4 + Math.random() * 5) + "px");
    fleck.style.setProperty("--fleck-radius", Math.random() > 0.5 ? "50%" : "2px");
    fleck.style.setProperty("--fleck-color", colors[i % colors.length]);
    fleck.style.left = originX + "px";
    fleck.style.top = originY + "px";

    confettiLayer.appendChild(fleck);
    fleck.addEventListener("animationend", () => fleck.remove());
  }
}

/* ---------------------------------------------------------------------- *
 * 9. COPIA INDIRIZZO
 * ---------------------------------------------------------------------- */
copyBtn.addEventListener("click", async () => {
  const text = `${CONFIG.venueName} — ${CONFIG.address}`;
  const originalLabel = copyBtn.textContent;

  try {
    await navigator.clipboard.writeText(text);
    showCopyFeedback(originalLabel);
  } catch (err) {
    // Fallback per browser senza Clipboard API o senza permesso
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showCopyFeedback(originalLabel);
    } catch (fallbackErr) {
      copyBtn.textContent = "Copia non riuscita";
      window.setTimeout(() => { copyBtn.textContent = originalLabel; }, 1800);
    }
    document.body.removeChild(textarea);
  }
});

function showCopyFeedback(originalLabel) {
  copyBtn.textContent = "Copiato!";
  window.setTimeout(() => { copyBtn.textContent = originalLabel; }, 1800);
}

/* ---------------------------------------------------------------------- *
 * 10. AGGIUNGI AL CALENDARIO — genera un file .ics al volo, nessun
 *     servizio esterno richiesto.
 * ---------------------------------------------------------------------- */
calendarBtn.addEventListener("click", () => {
  const parsed = parseItalianDateTime(CONFIG.date, CONFIG.time);
  const dtStart = parsed ? toICSDate(parsed) : "";
  const dtEnd = parsed ? toICSDate(new Date(parsed.getTime() + 3 * 60 * 60 * 1000)) : "";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Invito Laurea//IT",
    "BEGIN:VEVENT",
    `SUMMARY:Laurea di ${CONFIG.name} — ${CONFIG.degree}`,
    dtStart ? `DTSTART:${dtStart}` : "",
    dtEnd ? `DTEND:${dtEnd}` : "",
    `LOCATION:${CONFIG.venueName}, ${CONFIG.address}`,
    `DESCRIPTION:Test di reattività superato. Ci vediamo lì!`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `laurea-${CONFIG.name.toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// Interpreta stringhe tipo "12 settembre 2026" + "11:30" in un oggetto Date.
// Se la data è ancora un segnaposto (es. "[DA COMPILARE]"), restituisce
// null senza generare errori: il file .ics viene comunque creato, solo
// senza orario preciso.
function parseItalianDateTime(dateStr, timeStr) {
  const months = {
    gennaio: 0, febbraio: 1, marzo: 2, aprile: 3, maggio: 4, giugno: 5,
    luglio: 6, agosto: 7, settembre: 8, ottobre: 9, novembre: 10, dicembre: 11,
  };
  const match = dateStr.toLowerCase().match(/(\d{1,2})\s+([a-zà]+)\s+(\d{4})/i);
  if (!match) return null;
  const [, day, monthName, year] = match;
  const month = months[monthName];
  if (month === undefined) return null;
  const [h, m] = (timeStr || "00:00").split(":").map(Number);
  if (Number.isNaN(h)) return null;
  return new Date(Number(year), month, Number(day), h || 0, m || 0);
}

function toICSDate(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    "00"
  );
}

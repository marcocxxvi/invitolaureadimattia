# 🐶 Invito alla laurea — Mattia

Invito interattivo a pagina singola: il cane di Mattia come "Direttore delle Selezioni", un test di reattività da superare, sblocco con un timbro ufficiale "ACCESSO AUTORIZZATO" e i dettagli della festa. HTML + CSS + JS puri, nessuna libreria esterna, nessun build da lanciare.

## File

```
invito-laurea-mattia/
├── index.html
├── style.css
├── script.js
└── assets/
    └── cane-principale.jpg   → foto del cane di Mattia (da aggiungere)
```

## 1. Come si apre

Doppio clic su `index.html`: si apre nel browser, non serve un server né installare nulla.

## 2. Cosa manca ancora e dove inserirlo

Il sito è già completo e funzionante, ma **mancano i dati reali della festa** e **il nome del cane**, che nel brief hai detto mi avresti mandato dopo. Non li ho inventati: ho lasciato segnaposto chiaramente visibili.

Tutto si modifica in un unico punto: l'oggetto `CONFIG` all'inizio di `script.js`.

```js
const CONFIG = {
  name: "Mattia",
  degree: "Scienze Motorie",

  dogName: "il cane",              // ← metti il nome vero del cane
  dogTitle: "Direttore delle Selezioni",   // puoi cambiarlo se hai un'idea più divertente
  dogPhoto: "assets/cane-principale.jpg",

  date: "[DA COMPILARE]",          // es. "14 marzo 2027"
  time: "[DA COMPILARE]",          // es. "18:00"
  venueName: "[DA COMPILARE]",
  address: "[DA COMPILARE]",
  mapsUrl: "",                     // link di Google Maps al locale
  notes: "",                       // es. dress code, parcheggio — lascia "" per nasconderla

  whatsappNumber: "",
  whatsappMessage: "Ci sarò! 🎓 ...",
  ...
};
```

Finché `date`, `time`, `venueName` e `address` restano `"[DA COMPILARE]"`, compariranno così nella pagina: è voluto, serve a ricordarti cosa manca. Appena li sostituisci con i dati veri, la pagina si aggiorna da sola — non serve toccare nient'altro nel codice.

Se `mapsUrl` resta vuoto, il link all'indirizzo si disattiva automaticamente (non porta a nessun posto a caso). Lo stesso vale per `notes`: se lo lasci vuoto, quella riga sparisce da sola dai dettagli.

## 3. Come aggiungere la foto del cane

Salva la foto come `cane-principale.jpg` dentro la cartella `assets/` (quella già creata insieme agli altri file). Va bene anche un formato diverso (`.png`, `.jpeg`): in quel caso aggiorna il nome del file nella riga `dogPhoto` di `CONFIG`, in `script.js`.

Finché la foto non c'è, la pagina mostra automaticamente un'illustrazione al suo posto — puoi quindi testare e persino condividere il link in anteprima prima ancora di avere la foto pronta.

> La stessa foto viene usata sia nella schermata iniziale sia in quella del test: se in futuro vuoi usarne due diverse, basta aggiungere un secondo campo in `CONFIG` (dimmi pure se ti serve, è una modifica di due minuti).

## 4. Come funziona l'esperienza

1. **Apertura** — il cane si presenta come "Direttore delle Selezioni", si scopre che l'accesso alla festa è sotto esame.
2. **Briefing** — spiega in una riga le regole del test (quanti tentativi, come fermare l'indicatore).
3. **Il test** — un indicatore rosso scorre avanti e indietro su una barra; bisogna fermarlo dentro la zona verde toccando la barra, cliccandola, premendo il pulsante "Ferma qui", oppure con Spazio/Invio da tastiera. Tre tentativi disponibili; se falliscono tutti, l'accesso viene comunque concesso ("per grazia") — il test non blocca mai nessuno sul serio.
4. **Sblocco** — un timbro "ACCESSO AUTORIZZATO" si schiaccia sullo schermo con un piccolo fischietto, poi si apre l'invito vero e proprio: dati dell'evento, pulsante WhatsApp con messaggio già scritto, "Aggiungi al calendario" (genera un file `.ics`) e "Copia indirizzo".

## 5. Come pubblicarlo online (per mandarlo via WhatsApp)

Il file va aperto da un link, non mandato come allegato. Il modo più veloce e gratuito:

**Netlify Drop** (nessun account richiesto)
1. Vai su [app.netlify.com/drop](https://app.netlify.com/drop)
2. Trascina l'intera cartella `invito-laurea-mattia` (con dentro tutti i file, inclusa `assets/` con la foto)
3. In pochi secondi ottieni un link pubblico da condividere

**Alternative**: GitHub Pages, Vercel, Cloudflare Pages — stesso principio.

> Se usi GitHub Pages: assicurati che `index.html`, `style.css`, `script.js` e la cartella `assets/` finiscano esattamente nella **root** del repository, non dentro un'altra sottocartella — altrimenti la pagina non si pubblica correttamente.

## 6. Prossimi passi

Per completare l'invito mi servono ancora:
- Il **nome del cane** (se vuoi usare qualcosa di diverso dal placeholder "il cane")
- **Data, ora, luogo e indirizzo** della festa
- La **foto del cane** da mettere in `assets/cane-principale.jpg`
- Eventuali note pratiche (dress code, parcheggio, ecc.) o battute personali da aggiungere al tono del sito

Appena li hai, mandameli e aggiorno `CONFIG` — o lo fai tu direttamente seguendo il punto 2 di questo file.

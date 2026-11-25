# ⚡ Aether Bridge

**Aether Bridge** trasforma la normale chat web gratuita di **Google Gemini** in un vero agente locale stile Codex/Claude Code, capace di eseguire comandi da terminale, creare file, gestire cartelle e sviluppare progetti direttamente sul tuo dispositivo — **a costo zero** e senza bisogno di chiavi API.

Progettato e sviluppato da **Aether Labs**.

---

## ✨ Caratteristiche Principali

* **100% Gratuito:** Sfrutta l'interfaccia web gratuita di Gemini senza abbonamenti o limiti di API.
* **Esecuzione Multi-Blocco Intelligente:** Se l'AI divide un'operazione in più blocchi `#EXEC`, l'estensione li raccoglie tutti in ordine, ignora la cronologia vecchia della chat e li esegue in sequenza con un solo clic.
* **Multipiattaforma:** Funziona nativamente su **Linux**, **macOS**, **Windows** e **Android (Termux)**.
* **Controllo Umano (Sicurezza Totale):** Nessun comando viene mai eseguito in automatico. Ogni volta che viene rilevato un comando, appare un pannello in basso a destra con l'anteprima esatta del codice e i pulsanti **Esegui tutto** o **Chiudi (`✕`)**.
* **Workspace Dedicato:** Tutti i comandi vengono eseguiti di default nella cartella isolata `~/bridge_workspace`.

---

## 📋 Prerequisiti

* **Python 3** installato sul dispositivo.
* **Git** (opzionale, per clonare il repository).
* Un browser compatibile con le estensioni Chromium:
  * **Desktop:** Google Chrome, Chromium, Brave, Microsoft Edge, Opera, Vivaldi.
  * **Android:** Kiwi Browser o Mises Browser.

---

## 🚀 Guida all'Installazione

### 🐧 Linux & 🍎 macOS

1. **Clona il repository ed entra nella cartella:**
   ```bash
   git clone https://github.com
   cd aether_bridge
   ```

2. **Carica l'estensione nel browser:**
   * Apri il browser e vai su `chrome://extensions` (oppure `edge://extensions` / `brave://extensions`).
   * Attiva l'interruttore **Modalità sviluppatore** (Developer mode) in alto a destra.
   * Clicca su **Carica estensione non pacchettizzata** (Load unpacked) e seleziona la cartella `aether_bridge/extension`.
   * **Copia l'ID dell'estensione** (la stringa di 32 caratteri sotto il nome *Aether Bridge*).

3. **Collega l'estensione al terminale:**
   ```bash
   chmod +x install.sh
   ./install.sh
   ```
   Incolla l'ID dell'estensione quando richiesto dal terminale e premi **Invio**.

4. **Attiva:** Ricarica la pagina della chat (`F5`).

---

### 🪟 Windows

1. **Scarica il progetto:**
   * Clona il repository con Git oppure clicca su **Code -> Download ZIP** ed estrai la cartella sul tuo PC:
     ```cmd
     git clone https://github.com
     cd aether_bridge
     ```
   *(Assicurati di avere **Python 3** installato e aggiunto al PATH di sistema).*

2. **Carica l'estensione nel browser:**
   * Vai su `chrome://extensions` (o `edge://extensions`), attiva la **Modalità sviluppatore**, clicca su **Carica estensione non pacchettizzata** e seleziona la cartella `extension`.
   * **Copia l'ID dell'estensione** (32 caratteri).

3. **Esegui l'installer di Windows:**
   * Fai doppio clic sul file **`install.bat`** (oppure lancialo dal Prompt dei Comandi).
   * Incolla l'ID dell'estensione quando richiesto e premi **Invio**.

4. **Attiva:** Ricarica la pagina della chat (`F5`).

---

### 📱 Android (Termux + Kiwi / Mises Browser)

Su Android, Aether Bridge utilizza un micro-server locale (`127.0.0.1:8765`) che fa da ponte tra Termux e il browser mobile.

1. **Installa e configura su Termux:**
   Apri **Termux** ed esegui questi comandi:
   ```bash
   pkg update && pkg upgrade -y
   pkg install git -y
   git clone https://github.com
   cd aether_bridge
   chmod +x install.sh
   ./install.sh
   ```
   *(Lo script installerà automaticamente Python e creerà il pacchetto `aether_bridge_extension.zip` nella tua cartella `Download`).*

2. **Installa l'estensione sul browser mobile:**
   * Apri **Kiwi Browser** o **Mises Browser**.
   * Vai su `chrome://extensions` e attiva la **Modalità sviluppatore**.
   * Clicca su **+(from .zip/.crx/.user.js)** e seleziona il file `aether_bridge_extension.zip` dalla cartella `Download`.

3. **Avvia il ponte su Termux:**
   Torna su Termux e avvia il server con il comando rapido:
   ```bash
   aether-bridge
   ```
   *(Tieni Termux aperto in background mentre usi Gemini nel browser).*

---

## 💬 Come Usarlo

1. Apri una nuova chat su **Google Ai Mode**.
2. Incolla questo **Prompt di Sistema** come primo messaggio per istruire l'AI su come comunicare con il tuo terminale:

   > *"Da ora in poi, quando devi eseguire un comando sul mio terminale, crea uno o più blocchi di codice che iniziano esattamente con `#EXEC` sulla prima riga, seguiti dai comandi bash/shell. Io li eseguirò sul mio dispositivo e ti manderò l'output."*

3. **Flusso di lavoro:**
   * Quando Gemini risponde con uno o più blocchi `#EXEC`, comparirà automaticamente il pannello **⚡ Aether Bridge** in basso a destra sullo schermo.
   * Controlla i comandi mostrati nell'anteprima e clicca su **Esegui tutto in ~/bridge_workspace**.
   * L'output del terminale verrà **incollato automaticamente** nella casella di risposta della chat, pronto per essere inviato a Gemini per il passaggio successivo!

---

## 🛡️ Sicurezza

* **Revisione obbligatoria:** Aether Bridge non esegue mai nulla senza il tuo clic esplicito su **Esegui**. Leggi sempre l'anteprima dei comandi prima di autorizzarli.
* **Ambiente locale:** Il server locale usato su Android/Termux accetta connessioni esclusivamente da `127.0.0.1` (localhost) e non espone porte verso la rete esterna.

---

## 📄 Licenza

Progetto rilasciato sotto licenza **MIT** — creato da **Aether Labs**.

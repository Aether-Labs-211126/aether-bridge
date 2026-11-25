# ⚡ Aether Bridge

**Aether Bridge** trasforma la chat web gratuita di **Google Gemini** in un vero agente locale autonomo (stile Codex / Claude Code / MimmoAI), capace di eseguire comandi da terminale, gestire file, mantenere una memoria persistente e lavorare in loop continuo direttamente sul tuo dispositivo — **a costo zero** e senza bisogno di chiavi API.

Progettato e sviluppato da **Aether Labs**.

---

## ✨ Caratteristiche Principali

* **100% Gratuito:** Sfrutta l'interfaccia web gratuita di Gemini senza abbonamenti o limiti di API.
* **Modalità Agente Autonomo (`Auto-Loop: ON/OFF`):** Con un clic puoi attivare l'esecuzione e l'invio automatico delle risposte in chat: Gemini esegue i comandi, legge l'output, decide il passo successivo e lavora in autonomia finché non completa l'obiettivo (`#DONE`).
* **Memoria Persistente (`SOUL.md`, `MEMORY.md`, `TASKS.md`):** Include i template per dare all'agente un'identità, una coda di obiettivi e una memoria continua su disco tra una sessione di chat e l'altra.
* **Esecuzione Multi-Blocco Intelligente:** Raccoglie in ordine tutti i blocchi `#EXEC` di una risposta, ignora lo storico vecchio della chat e li esegue in sequenza.
* **Multipiattaforma:** Supporta **Linux**, **macOS**, **Windows** e **Android (Termux)**.
* **Controllo Umano (Sicurezza Totale):** Di default l'Auto-Loop è **OFF**; appare un pannello di anteprima con i pulsanti **Esegui tutto** e **Chiudi (`✕`)** per fermare qualsiasi operazione all'istante.

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
   * Vai su `chrome://extensions` (oppure `edge://extensions` / `brave://extensions`).
   * Attiva la **Modalità sviluppatore** in alto a destra.
   * Clicca su **Carica estensione non pacchettizzata** e seleziona la cartella `aether_bridge/extension`.
   * **Copia l'ID dell'estensione** (32 caratteri).

3. **Collega l'estensione al terminale e copia i template di memoria:**
   ```bash
   chmod +x install.sh
   ./install.sh
   cp -n templates/* ~/bridge_workspace/
   ```
   Incolla l'ID dell'estensione quando richiesto e premi **Invio**.

4. **Attiva:** Ricarica la pagina della chat (`F5`).

---

### 🪟 Windows

1. **Scarica il progetto:**
   ```cmd
   git clone https://github.com
   cd aether_bridge
   ```
   *(Assicurati di avere **Python 3** installato).*

2. **Carica l'estensione nel browser:**
   * Vai su `chrome://extensions` (o `edge://extensions`), attiva la **Modalità sviluppatore**, clicca su **Carica estensione non pacchettizzata** e seleziona la cartella `extension`.
   * **Copia l'ID dell'estensione** (32 caratteri).

3. **Esegui l'installer:**
   * Fai doppio clic su **`install.bat`**, incolla l'ID dell'estensione e premi **Invio**.
   * Copia i file dentro `templates\` nella cartella `%USERPROFILE%\bridge_workspace\`.

4. **Attiva:** Ricarica la pagina della chat (`F5`).

---

### 📱 Android (Termux + Kiwi / Mises Browser)

1. **Installa e configura su Termux:**
   ```bash
   pkg update && pkg upgrade -y
   pkg install git -y
   git clone https://github.com
   cd aether_bridge
   chmod +x install.sh
   ./install.sh
   cp -n templates/* ~/bridge_workspace/
   ```
   *(Lo script installerà Python e creerà `aether_bridge_extension.zip` nella tua cartella `Download`).*

2. **Installa l'estensione sul browser mobile:**
   * Apri **Kiwi Browser** o **Mises Browser**, vai su `chrome://extensions`, attiva la **Modalità sviluppatore**, clicca su **+(from .zip/.crx/.user.js)** e seleziona `aether_bridge_extension.zip` da `Download`.

3. **Avvia il ponte su Termux:**
   ```bash
   aether-bridge
   ```

---

## 🤖 Come Usarlo (Modalità Manuale vs Agente Autonomo)

### Modalità Standard (Conferma Manuale)
Incolla questo prompt all'inizio della chat:
> *"Quando devi eseguire un comando sul mio terminale, crea uno o più blocchi di codice che iniziano esattamente con `#EXEC` sulla prima riga, seguiti dai comandi. Io li eseguirò e ti manderò l'output."*

### Modalità Agente Autonomo (Auto-Loop + Memoria)
1. Incolla questo prompt di avvio:
   > *"Sei Aether, il mio agente autonomo. Leggi subito `~/bridge_workspace/SOUL.md`, `MEMORY.md` e `TASKS.md` usando un blocco `#EXEC`. Poi imposta questo obiettivo in `TASKS.md` e portalo a termine passo dopo passo usando blocchi `#EXEC`, aggiornando `MEMORY.md` alla fine e scrivendo `#DONE` quando hai finito. Obiettivo: [INSERISCI QUI L'OBIETTIVO]"*
2. Quando compare il primo riquadro **⚡ Aether Bridge**, clicca su **`Auto-Loop: OFF`** per portarlo su **`Auto-Loop: ON 🔄`** e clicca su **Esegui**: l'agente lavorerà in loop autonomo fino al completamento!

---

## 🛡️ Sicurezza

* **Controllo totale:** L'Auto-Loop parte sempre disattivato (`OFF`) e può essere interrotto in qualsiasi momento cliccando su `Auto-Loop: ON 🔄` o sulla `✕` rossa.
* **Ambiente locale:** Il server locale per Android/Termux accetta connessioni esclusivamente da `127.0.0.1`.

---

## 📄 Licenza

Progetto rilasciato sotto licenza **MIT** — creato da **Aether Labs**.

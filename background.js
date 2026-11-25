let activeCommands = [];
let executedSignatures = new Set();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sync_frame_blocks") {
    // Riceve i blocchi puliti da un frame, filtrando quelli già eseguiti in passato
    const fresh = request.blocks.filter(b => !executedSignatures.has(b));
    if (fresh.length > 0) {
      // Mantiene solo gli ultimi blocchi non ancora eseguiti senza duplicati
      fresh.forEach(cmd => {
        if (!activeCommands.includes(cmd)) {
          // Rimuove eventuali versioni incomplete (prefissi) dello stesso comando
          activeCommands = activeCommands.filter(existing => !cmd.startsWith(existing));
          activeCommands.push(cmd);
        }
      });
    }
    sendResponse({ queue: activeCommands });
    return true;
  }

  if (request.action === "get_queue") {
    sendResponse({ queue: activeCommands });
    return true;
  }

  if (request.action === "clear_queue") {
    activeCommands.forEach(c => executedSignatures.add(c));
    activeCommands = [];
    sendResponse({ ok: true });
    return true;
  }

  if (request.action === "execute_cmd") {
    const fullCmd = activeCommands.join("\n");
    activeCommands.forEach(c => executedSignatures.add(c));
    activeCommands = [];

    if (!fullCmd.trim()) {
      sendResponse({ status: "error", output: "Nessun comando valido da eseguire." });
      return true;
    }

    chrome.runtime.sendNativeMessage("aether_bridge", { cmd: fullCmd }, (response) => {
      if (chrome.runtime.lastError) {
        fetch("http://127.0.0.1:8765", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cmd: fullCmd })
        })
        .then(r => r.json())
        .then(data => sendResponse(data))
        .catch(err => sendResponse({ status: "error", output: "Errore: " + chrome.runtime.lastError.message }));
      } else {
        sendResponse(response);
      }
    });
    return true;
  }
});

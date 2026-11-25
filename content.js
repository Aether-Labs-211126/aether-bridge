const isTopWindow = (window === window.top);
let panel = null;

if (isTopWindow) {
  panel = document.createElement('div');
  panel.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:999999;background:#1e1e2e;color:#cdd6f4;padding:12px;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.4);font-family:monospace;max-width:380px;display:none;border:1px solid #89b4fa;';
  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
      <span id="ab-title" style="font-weight:bold;color:#89b4fa;">⚡ Aether Bridge</span>
      <button id="ab-close-btn" style="background:transparent;border:none;color:#f38ba8;cursor:pointer;font-weight:bold;font-size:14px;">✕</button>
    </div>
    <pre id="ab-cmd-preview" style="background:#11111b;padding:8px;border-radius:6px;overflow-x:auto;max-height:150px;font-size:12px;margin:0 0 8px 0;white-space:pre-wrap;"></pre>
    <button id="ab-run-btn" style="background:#a6e3a1;color:#11111b;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-weight:bold;width:100%;">Esegui tutto in ~/bridge_workspace</button>
  `;
  document.body.appendChild(panel);

  document.getElementById('ab-close-btn').onclick = () => {
    panel.style.display = 'none';
    chrome.runtime.sendMessage({ action: "clear_queue" });
  };

  document.getElementById('ab-run-btn').onclick = () => {
    const btn = document.getElementById('ab-run-btn');
    btn.innerText = "Esecuzione in corso...";
    chrome.runtime.sendMessage({ action: "execute_cmd" }, (res) => {
      panel.style.display = 'none';
      btn.innerText = "Esegui tutto in ~/bridge_workspace";
      const inputBox = document.querySelector('div[contenteditable="true"], textarea');
      if (inputBox) {
        inputBox.focus();
        document.execCommand('insertText', false, "Output del terminale:\n```\n" + res.output + "\n```");
      } else {
        alert("Output:\n" + res.output);
      }
    });
  };
}

let ignoredHistory = new Set();
let isInitializing = true;
let lastStableSnapshot = "";
let debounceTimer = null;

// Nei primi 2 secondi dal caricamento della pagina, memorizza e ignora tutta la cronologia vecchia
setTimeout(() => { isInitializing = false; }, 2000);

setInterval(() => {
  const allBlocks = Array.from(document.querySelectorAll('code'))
    .map(b => b.innerText.trim())
    .filter(t => t.startsWith("#EXEC\n") || t.startsWith("#EXEC "))
    .map(t => t.replace(/^#EXEC\s*/, "").trim())
    .filter(t => t.length > 0);

  if (isInitializing) {
    allBlocks.forEach(b => ignoredHistory.add(b));
    return;
  }

  const newBlocks = allBlocks.filter(b => !ignoredHistory.has(b));
  const currentSnapshot = newBlocks.join("|||");

  if (currentSnapshot !== lastStableSnapshot) {
    lastStableSnapshot = currentSnapshot;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (newBlocks.length > 0) {
        chrome.runtime.sendMessage({ action: "sync_frame_blocks", blocks: newBlocks });
      }
    }, 1500);
  }

  if (isTopWindow && panel) {
    chrome.runtime.sendMessage({ action: "get_queue" }, (res) => {
      if (res && res.queue && res.queue.length > 0) {
        document.getElementById('ab-title').innerText = `⚡ Aether Bridge (${res.queue.length} ${res.queue.length === 1 ? 'comando' : 'comandi'})`;
        document.getElementById('ab-cmd-preview').innerText = res.queue.join("\n");
        panel.style.display = 'block';
      } else {
        panel.style.display = 'none';
      }
    });
  }
}, 800);

// security.js
// Handles browser lockdowns, anti-cheat, and UI protection.

// 1. Block Right-Click
document.addEventListener("contextmenu", (e) => e.preventDefault());

// 2. Block Keyboard Shortcuts (Windows & Mac)
document.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" ||
    // Windows/Linux Shortcuts
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && e.key.toUpperCase() === "U") ||
    // Mac Shortcuts
    (e.metaKey && e.altKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
    (e.metaKey && e.key.toUpperCase() === "U")
  ) {
    e.preventDefault();
  }
});

// 3. The "Debugger Trap" (Anti-Cheat)
// This runs every 1 second. If DevTools is closed, it does nothing.
// If DevTools is open, the browser forces a pause on the 'debugger' line.
setInterval(() => {
    const start = performance.now();
    
    // Trigger the browser's native debugger pause
    debugger; 
    
    const end = performance.now();
    
    // If it took longer than 100ms to execute, it means the debugger caught it!
    if (end - start > 100) {
        // Nuke the UI
        document.body.innerHTML = `
            <div style="background-color: black; height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                <h1 style="color: #ef4444; font-family: monospace; font-size: 3rem; font-weight: bold;">SECURITY VIOLATION</h1>
                <p style="color: #34d399; font-family: monospace; font-size: 1.5rem;">Developer Tools Detected. Cheating is not allowed.</p>
                <p style="color: #64748b; font-family: monospace; font-size: 1rem; margin-top: 20px;">Close DevTools and refresh the page to continue.</p>
            </div>
        `;
    }
}, 1000);

// 4. Overwrite Console to prevent command injection
console.log = function() { return "Console locked by SysAdmin."; };
console.warn = function() { return "Console locked by SysAdmin."; };
console.error = function() { return "Console locked by SysAdmin."; };
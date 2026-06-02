// fx.js
// Procedural 8-bit Audio and Visual Effects Engine

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (audioCtx.state === "suspended") audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  if (type === "success") {
    // Retro Coin/Level Up Sound
    osc.type = "square";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === "error") {
    // Angry Buzz Sound
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  } else if (type === "type") {
    // Mechanical Keyboard Click
    osc.type = "sine";
    // Randomize pitch slightly for organic typing feel
    osc.frequency.setValueAtTime(600 + Math.random() * 200, now);
    gainNode.gain.setValueAtTime(0.02, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.05);
  }
}

function showFloatingXP(amount) {
  const fx = document.createElement("div");
  fx.className =
    "xp-float text-2xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,1)]";
  fx.innerText = `+${amount} XP!`;
  document.body.appendChild(fx);

  // Remove the element from the DOM after the animation finishes
  setTimeout(() => fx.remove(), 1000);
}

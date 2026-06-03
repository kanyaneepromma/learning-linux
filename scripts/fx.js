// fx.js
// Procedural Web Audio API Sound Synthesizer & Visual Effects

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (audioCtx.state === "suspended") audioCtx.resume();

  const now = audioCtx.currentTime;
  const gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);

  if (type === "success") {
    // Retro Coin/Level Up Sound
    const osc = audioCtx.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gainNode);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === "error") {
    // Angry Buzz Sound
    const osc = audioCtx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gainNode);
    osc.start(now);
    osc.stop(now + 0.2);
  } else if (type === "type") {
    // Mechanical Keyboard Click
    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600 + Math.random() * 200, now);
    gainNode.gain.setValueAtTime(0.02, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gainNode);
    osc.start(now);
    osc.stop(now + 0.05);
  } else if (type === "book") {
    // 📖
    // Soft white noise burst (paper rustle)
    const bufferSize = audioCtx.sampleRate * 0.1;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, now);

    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    noiseSource.connect(filter).connect(gainNode);
    noiseSource.start(now);
  } else if (type === "quest") {
    // 🏆
    // Victorious 4-note Arpeggio
    const freqs = [440, 554, 659, 880]; // A, C#, E, A
    freqs.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      const oscGain = audioCtx.createGain();
      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.setValueAtTime(0.1, now + i * 0.08);
      oscGain.gain.linearRampToValueAtTime(0, now + i * 0.08 + 0.2);

      osc.connect(oscGain).connect(audioCtx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.2);
    });
  } else if (type === "tool") {
    // 🛠️
    // Metallic clank/tink
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    osc1.type = "square";
    osc2.type = "sine";
    osc1.frequency.setValueAtTime(1200, now);
    osc2.frequency.setValueAtTime(2000, now);
    osc1.frequency.exponentialRampToValueAtTime(600, now + 0.1);

    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.1);
    osc2.stop(now + 0.1);
  } else if (type === "lightbulb") {
    // 💡
    // Bright pop/ding
    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 0.05);

    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gainNode);
    osc.start(now);
    osc.stop(now + 0.15);
  } else if (type === "sweep") {
    // 🧹
    // Filtered noise sweeping downwards
    const bufferSize = audioCtx.sampleRate * 0.4;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(5000, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.4);
    filter.Q.value = 2;

    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.4);

    noiseSource.connect(filter).connect(gainNode);
    noiseSource.start(now);
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

const input = document.getElementById("password");
const bar = document.getElementById("strength-bar");
const text = document.getElementById("strength-text");
const crack = document.getElementById("crack-time");
const suggestions = document.getElementById("suggestions");
const toggle = document.getElementById("toggle");

// toggle visibility
toggle.onclick = () => {
  input.type = input.type === "password" ? "text" : "password";
};

input.addEventListener("input", () => {
  const p = input.value;
  let score = 0;
  let feedback = [];

  if (p.length >= 8) score++; else feedback.push("Min 8 characters");
  if (p.length >= 12) score++;

  if (/[A-Z]/.test(p)) score++; else feedback.push("Add uppercase");
  if (/[a-z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++; else feedback.push("Add numbers");
  if (/[^A-Za-z0-9]/.test(p)) score++; else feedback.push("Add symbols");

  if (/(.)\1{2,}/.test(p)) {
    score--; feedback.push("Avoid repetition");
  }

  if (/123|abc|password/i.test(p)) {
    score--; feedback.push("Avoid common patterns");
  }

  score = Math.max(score, 0);

  // bar width
  bar.style.width = (score / 6) * 100 + "%";

  // color + label
  if (score <= 2) {
    bar.style.background = "#ef4444";
    text.innerText = "Weak";
  } else if (score <= 4) {
    bar.style.background = "#facc15";
    text.innerText = "Medium";
  } else {
    bar.style.background = "#22c55e";
    text.innerText = "Strong";
  }

  // improved crack time logic
  let crackTime = "Instant";

  if (score >= 3 && p.length >= 8) crackTime = "Minutes";
  if (score >= 4 && p.length >= 10) crackTime = "Hours";
  if (score >= 5 && p.length >= 12) crackTime = "Days";
  if (score === 6 && p.length >= 14) crackTime = "Years";

  crack.innerText = "Crack Time: " + crackTime;

  suggestions.innerHTML = feedback.map(f => `<div>• ${f}</div>`).join("");
});
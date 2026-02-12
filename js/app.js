const soloBtn = document.getElementById("soloBtn");
const bestiesBtn = document.getElementById("bestiesBtn");
const entryScreen = document.getElementById("entryScreen");
const desktop = document.getElementById("desktop");
const modeTitle = document.getElementById("modeTitle");

function enterMode(mode) {
    entryScreen.classList.add("hidden");
    desktop.classList.remove("hidden");

    if (mode === "solo") {
        modeTitle.textContent = "Solo Galentine Mode Activated ✨";
    } else {
        modeTitle.textContent = "Besties Galentine Mode Activated 💞";
    }
}

soloBtn.addEventListener("click", () => enterMode("solo"));
bestiesBtn.addEventListener("click", () => enterMode("besties"));

let lastSparkleTime = 0;

document.addEventListener("mousemove", (e) => {
    const now = Date.now();

    // control spacing (increase number = fewer sparkles)
    if (now - lastSparkleTime < 80) return;
    lastSparkleTime = now;

    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    // random cute symbol
    const shapes = ["✦", "✧", "♥", "♡", "❁", "❀"];
    sparkle.textContent = shapes[Math.floor(Math.random() * shapes.length)];

    sparkle.style.left = e.pageX + "px";
    sparkle.style.top = e.pageY + "px";

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 900);
});


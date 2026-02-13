const soloBtn = document.getElementById("soloBtn");
const bestiesBtn = document.getElementById("bestiesBtn");
const entryScreen = document.getElementById("entryScreen");
const desktop = document.getElementById("desktop");
const modeTitle = document.getElementById("modeTitle");

if (soloBtn && bestiesBtn) {
    soloBtn.addEventListener("click", () => {window.location.href = "../pages/transition.html?mode=solo";});
    bestiesBtn.addEventListener("click", () => {window.location.href = "../pages/transition.html?mode=besties";});
}
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

// script for transition page

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

window.addEventListener("load", () => {
    const note = document.getElementById("loadingNote");
    const bar = document.getElementById("progressBar");

    if (!note || !bar) return;

    const message = 
    `Great choice!
    Fetching special ${mode === "solo" ? "'Solo Galentine'" : "'Galentine with besties'"} ideas just for you...
    My special guest ⋆˚✿˖°`;

    // typewriter
    let i = 0;
    function typeWriter() {
        if (i < message.length) {
            note.textContent += message[i];
            i++;
            setTimeout(typeWriter, 40);
        }
    }

    // progress bar
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        bar.style.width = progress + "%";

        if (progress === 10) typeWriter();

        if (progress >= 100) {
            clearInterval(interval);

            setTimeout(() => {
                window.location.href =
                    mode === "solo"
                        ? "../pages/solo.html"
                        : "../pages/besties.html";
            }, 800);
        }
    }, 55);
});

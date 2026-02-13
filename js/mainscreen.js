const contentArea = document.getElementById("contentArea");
const folders = document.querySelectorAll(".folder-item");
const backButton = document.getElementById("backButton");
const fileSystem = {
    root: {
        type: "folder",
        children: {
            Decorations: {
                type: "file",
                json: "../content/decorations.json",
                icon: "file"
            },
            "Solo Date": {
                type: "file",
                json: "../content/solo-date.json",
                icon: "file"
            },
            Recipes: {
                type: "folder",
                icon: "folder",
                children: {
                    drinks: {
                        type: "file",
                        json: "../content/drinks.json",
                        icon: "file"
                    },
                    baking: {
                        type: "file",
                        json: "../content/baking.json",
                        icon: "file"
                    }
                }
            }
        }
    }
};

let currentPath = ["root"];

function getCurrentFolder() {
    return currentPath.reduce((acc, key) => acc[key], fileSystem);
}

const folderList = document.querySelector(".folder-list");

function renderExplorer() {
    folderList.innerHTML = "";

    const folder = getCurrentFolder();

    // show / hide back button
    if (currentPath.length > 1) {
        backButton.classList.remove("hidden");
        backButton.onclick = () => {
            currentPath.pop();
            currentPath.pop();
            renderExplorer();
        };
    } else {
        backButton.classList.add("hidden");
    }

    for (const key in folder.children) {
        const item = folder.children[key];

        const div = document.createElement("div");
        div.className = "folder-item";

        const icon = item.type === "folder"
            ? "../img/folder-icon-pink.png"
            : "../img/file-icon.png";

        div.innerHTML = `
            <img src="${icon}" class="file-explorer-folder">
            <span>${key}</span>
        `;

        div.onclick = () => handleClick(key, item);

        folderList.appendChild(div);
    }
}

function handleClick(name, item) {
    if (item.type === "folder") {
        currentPath.push("children", name);
        renderExplorer();
    } else {
        loadContent(item.json);
    }
}



folders.forEach(folder => {
    folder.addEventListener("click", () => {
        const file = folder.dataset.file;
        loadContent(file);
    });
});

function renderTitle(title) {
    return `<h2>${title}</h2>`;
}

function renderParagraph(text) {
    return `<p class="content-paragraph">${text}</p>`;
}

function renderList(items) {
    return `
        <ul class="content-list">
            ${items.map(i => `<li>${i}</li>`).join("")}
        </ul>
    `;
}

function renderRecipes(recipes) {
    return `
        <div class="recipes">
            ${recipes.map(r => `
                <div class="recipe-card">
                    <h4>${r.name}</h4>
                    <p>${r.desc || r.method}</p>
                    ${r.url ? `<a href="${r.url}" style="color: #693b2c; font-size: 12px;" target="_blank">Check the full recipe here!</a>` : ""}
                </div>
            `).join("")}
        </div>
    `;
}

async function loadContent(path) {
    const response = await fetch(path);
    const data = await response.json();

    let html = "";

    if (data.title) {
        html += renderTitle(data.title);
    }

    if (data.p) {
        html += renderParagraph(data.p);
    }

    if (data.list) {
        html += renderList(data.list);
    }

    if (data.recipes) {
        html += renderRecipes(data.recipes);
    }

    contentArea.innerHTML = html;
}

let quotes = [];
let currentQuote = 0;

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const prevBtn = document.getElementById("prevQuote");
const nextBtn = document.getElementById("nextQuote");
const dotsContainer = document.getElementById("quoteDots");

async function loadQuotes() {
    const res = await fetch("../content/quotes.json");
    quotes = await res.json();
    showQuote(0);
}

function showQuote(index) {
    const q = quotes[index];
    quoteText.textContent = `"${q.text}"`;
    quoteAuthor.textContent = `— ${q.author}`;

    document.querySelectorAll(".quote-dots span").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

prevBtn.addEventListener("click", () => {
    currentQuote = (currentQuote - 1 + quotes.length) % quotes.length;
    showQuote(currentQuote);
});

nextBtn.addEventListener("click", () => {
    currentQuote = (currentQuote + 1) % quotes.length;
    showQuote(currentQuote);
});

loadQuotes();
renderExplorer();

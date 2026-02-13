const contentArea = document.getElementById("contentArea");
const folders = document.querySelectorAll(".folder-item");
const backButton = document.getElementById("backButton");
const fileSystem = {
    root: {
        type: "folder",
        children: {
            activities: {
                type: "file",
                json: "../content/activities.json",
                icon: "file"
            },
            partyIdeas: {
                type: "file",
                json: "../content/party-ideas.json",
                icon: "file"
            },
            recepies: {
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

async function loadContent(path) {
    const response = await fetch(path);
    const data = await response.json();

    contentArea.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.content.map(item => `${item}</br>`).join("")}</p>
    `;
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
    createDots();
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

function createDots() {
    dotsContainer.innerHTML = "";
    quotes.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.addEventListener("click", () => {
            currentQuote = i;
            showQuote(currentQuote);
        });
        dotsContainer.appendChild(dot);
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

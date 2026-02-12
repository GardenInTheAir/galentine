const contentArea = document.getElementById("contentArea");
const folders = document.querySelectorAll(".folder-item");

folders.forEach(folder => {
    folder.addEventListener("click", () => {
        const file = folder.dataset.file;
        loadContent(file);
    });
});

async function loadContent(file) {
    const response = await fetch(`../content/${file}.json`);
    const data = await response.json();

    contentArea.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.content.map(item => `${item}</br>`).join("")}</p>
    `;
}
{/* <ul>
            ${data.content.map(item => `<li>${item}</li>`).join("")}
        </ul> */}
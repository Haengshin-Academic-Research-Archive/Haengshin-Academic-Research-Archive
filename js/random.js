const container = document.getElementById("random-container");

const paperFiles = [
  { id: 1, path: "papers/physics/001.txt" },
  { id: 2, path: "papers/physics/002.txt" },
  { id: 3, path: "papers/chemistry/003.txt" }
];

async function loadRandom() {
  const file = paperFiles[Math.floor(Math.random() * paperFiles.length)];
  const paper = await loadPaperTxt(file.path, file.id);

  const div = document.createElement("div");
  div.className = "paper";
  div.innerHTML = `
    <h3>${paper.title}</h3>
    <div class="meta">${paper.subject} | ${paper.category}</div>
    <p>${paper.abstract}</p>
    <a href="${paper.pdf}" target="_blank">PDF</a>
  `;
  container.appendChild(div);
}

for (let i = 0; i < 3; i++) loadRandom();

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadRandom();
  }
});

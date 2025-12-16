// js/random.js
import { loadMetaTxt, metaToPdfPath } from "./loader.js";
import { PAPER_META_FILES } from "./papers.js";

const container = document.getElementById("random-container");

async function loadRandomOne() {
  const metaPath = PAPER_META_FILES[Math.floor(Math.random() * PAPER_META_FILES.length)];
  const meta = await loadMetaTxt(metaPath);
  const pdfPath = metaToPdfPath(metaPath);

  const div = document.createElement("div");
  div.className = "paper";
  div.innerHTML = `
    <h3>${meta.title}</h3>
    <div class="meta">${meta.subject}</div>
    <p>${meta.abstract}</p>
    <a href="${encodeURI(pdfPath)}" target="_blank" rel="noopener">PDF</a>
  `;
  container.appendChild(div);
}

for (let i = 0; i < 3; i++) loadRandomOne();

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadRandomOne();
  }
});

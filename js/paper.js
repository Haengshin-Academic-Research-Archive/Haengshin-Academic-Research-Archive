// js/paper.js
import { loadMetaTxt, metaToPdfPath } from "./loader.js";
import { PAPER_META_FILES } from "./papers.js";

const params = new URLSearchParams(location.search);
const id = Number(params.get("id"));

(async () => {
  if (!id || id < 1 || id > PAPER_META_FILES.length) {
    document.getElementById("paper").innerHTML = "<p>잘못된 id입니다.</p>";
    return;
  }

  const metaPath = PAPER_META_FILES[id - 1];
  const meta = await loadMetaTxt(metaPath);
  const pdfPath = metaToPdfPath(metaPath);

  const container = document.getElementById("paper");
  container.innerHTML = `
    <h2>${meta.title}</h2>
    <div class="meta">구분: ${meta.subject}</div>
    <p>${meta.abstract}</p>
    <p><a href="${encodeURI(pdfPath)}" target="_blank" rel="noopener">PDF 보기</a></p>

    <iframe
      src="${encodeURI(pdfPath)}"
      style="width:100%; height:900px; border:1px solid #ddd;"
      loading="lazy"
    ></iframe>
  `;
})();

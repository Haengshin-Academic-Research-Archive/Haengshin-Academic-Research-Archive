// js/main.js
import { loadMetaTxt, metaToPdfPath } from "./loader.js";
import { PAPER_META_FILES } from "./papers.js";

const container = document.getElementById("main-content");

// 분류(폴더명과 동일)
const subjects = ["물리", "화학", "생명", "지구", "융합", "인문-사회"];

(async () => {
  const papers = [];

  for (let i = 0; i < PAPER_META_FILES.length; i++) {
    const metaPath = PAPER_META_FILES[i];
    const meta = await loadMetaTxt(metaPath);

    papers.push({
      id: i + 1,                   // ✅ 자동 id
      metaPath,
      pdfPath: metaToPdfPath(metaPath),
      title: meta.title,
      subject: meta.subject,
      abstract: meta.abstract,
    });
  }

  subjects.forEach(subject => {
    const section = document.createElement("section");
    section.innerHTML = `<h2>${subject}</h2><ul></ul>`;
    const ul = section.querySelector("ul");

    papers
      .filter(p => p.subject === subject)
      .forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="paper.html?id=${encodeURIComponent(p.id)}">${p.title}</a>`;
        ul.appendChild(li);
      });

    if (ul.children.length) container.appendChild(section);
  });

  // paper.html, random.html에서도 쓰게 전역 저장
  window.__PAPERS__ = papers;
})();



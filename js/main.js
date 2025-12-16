const container = document.getElementById("main-content");
const subjects = ["물리", "화학", "생명", "지구", "융합", "인문-사회"];

(async () => {
  const papers = [];
  for (const f of PAPER_FILES) {
    papers.push(await loadPaperTxt(f.txt, f.id));
  }

  subjects.forEach(subject => {
    const filtered = papers.filter(p => p["구분"] === subject);
    if (!filtered.length) return;

    const section = document.createElement("section");
    section.innerHTML = `<h2>${subject}</h2><ul></ul>`;
    const ul = section.querySelector("ul");

    filtered.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="paper.html?id=${p.id}">${p["제목"]}</a>`;
      ul.appendChild(li);
    });

    container.appendChild(section);
  });
})();



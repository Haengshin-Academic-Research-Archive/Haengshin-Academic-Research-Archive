const container = document.getElementById("main-content");

// 저장 순서 = 배열 순서
const paperFiles = [
  { id: 1, path: "papers/physics/001.txt" },
  { id: 2, path: "papers/physics/002.txt" },
  { id: 3, path: "papers/chemistry/003.txt" }
];

const subjects = ["물리", "화학", "생명", "지구과학"];

(async () => {
  const papers = [];
  for (const file of paperFiles) {
    papers.push(await loadPaperTxt(file.path, file.id));
  }

  subjects.forEach(subject => {
    const section = document.createElement("section");
    section.innerHTML = `<h2>${subject}</h2><ul></ul>`;
    const ul = section.querySelector("ul");

    papers
      .filter(p => p.subject === subject)
      .forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="paper.html?id=${p.id}">${p.title}</a>`;
        ul.appendChild(li);
      });

    container.appendChild(section);
  });
})();

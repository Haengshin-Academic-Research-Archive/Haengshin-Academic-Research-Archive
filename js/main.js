const container = document.getElementById("main-content");

// 분류(폴더명과 동일)
const subjects = ["물리", "화학", "생명", "지구", "융합", "인문-사회"];

async function loadManifest(path = "manifest.json") {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`manifest 로드 실패: ${res.status}`);
  return res.json();
}

(async () => {
  const papers = await loadManifest();

  subjects.forEach(subject => {
    const section = document.createElement("section");
    section.innerHTML = `<h2>${subject}</h2><ul></ul>`;
    const ul = section.querySelector("ul");

    papers
      .filter(p => p.subject === subject)
      .forEach(p => {
        const li = document.createElement("li");
        // paper.html에서 id로 찾아서 meta/paper 경로를 쓰게끔
        li.innerHTML = `<a href="paper.html?id=${encodeURIComponent(p.id)}">${p.title}</a>`;
        ul.appendChild(li);
      });

    // 해당 분류에 글이 없으면 섹션 숨기고 싶으면 아래 주석 해제
    // if (!ul.children.length) return;

    container.appendChild(section);
  });
})();


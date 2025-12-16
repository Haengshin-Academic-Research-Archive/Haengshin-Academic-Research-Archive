const container = document.getElementById("main-content");

// 분류(폴더명과 동일)
const subjects = ["물리", "화학", "생명", "지구", "융합", "인문-사회"];

(async () => {
  try {
    const manifest = await loadManifest();

    // manifest의 meta를 실제로 읽어 title/abstract를 채움
    const papers = await Promise.all(
      manifest.map(async (m) => {
        const meta = await loadPaperTxt(m.meta, m.id);
        return {
          id: m.id,
          subject: m.subject || meta.subject,
          title: meta.title,
          abstract: meta.abstract,
          pdf: m.pdf,
          metaPath: m.meta
        };
      })
    );

    subjects.forEach((subject) => {
      const section = document.createElement("section");
      section.innerHTML = `<h2>${subject}</h2><ul></ul>`;
      const ul = section.querySelector("ul");

      papers
        .filter((p) => p.subject === subject)
        .forEach((p) => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="paper.html?id=${encodeURIComponent(p.id)}">${p.title}</a>`;
          ul.appendChild(li);
        });

      // 글 없는 분류 숨기려면 주석 해제
      // if (!ul.children.length) return;

      container.appendChild(section);
    });
  } catch (err) {
    container.innerHTML = `<p>오류: ${err.message}</p>
      <p>※ 로컬에서 file://로 열면 fetch가 막힙니다. 반드시 로컬 서버로 실행하세요.</p>`;
    console.error(err);
  }
})();



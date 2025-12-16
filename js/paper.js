const params = new URLSearchParams(location.search);
const id = params.get("id");

const paperMap = {
  1: "papers/physics/001.txt",
  2: "papers/physics/002.txt",
  3: "papers/chemistry/003.txt"
};

(async () => {
  const paper = await loadPaperTxt(paperMap[id], id);
  const container = document.getElementById("paper");

  container.innerHTML = `
    <h2>${paper.title}</h2>
    <div class="meta">
      주제: ${paper.subject} | 카테고리: ${paper.category} | 날짜: ${paper.date}
    </div>
    <p>${paper.abstract}</p>
    <a href="${paper.pdf}" target="_blank">PDF 보기</a>
  `;
})();

